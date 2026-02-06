import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Product data type
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    owner : Text;
    price : Nat;
  };

  // User profile type
  public type UserProfile = {
    name : Text;
  };

  // Product module for comparing products by id
  module Product {
    public func compare(p1 : Product, p2 : Product) : {
      #less : ();
      #equal : ();
      #greater : ();
    } {
      Nat.compare(p1.id, p2.id);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<Nat, Product>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextProductId = 0;

  // User Profile APIs

  // Get the caller's user profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  // Get a specific user's profile
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save the caller's user profile
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product CRUD APIs

  // Create a new product
  public shared ({ caller }) func createProduct(name : Text, description : Text, owner : Text, price : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let id = nextProductId;
    nextProductId += 1;
    let product : Product = {
      id;
      name;
      description;
      owner;
      price;
    };
    products.add(id, product);
    id;
  };

  // Get all products
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  // Get a specific product by ID
  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  // Update an existing product
  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, owner : Text, price : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?_) {
        let updatedProduct : Product = {
          id;
          name;
          description;
          owner;
          price;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  // Delete a product
  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let wasDeleted = products.containsKey(id);
    if (not wasDeleted) {
      Runtime.trap("Product does not exist");
    };
    products.remove(id);
  };
};
