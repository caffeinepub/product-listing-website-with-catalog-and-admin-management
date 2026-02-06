# Specification

## Summary
**Goal:** Build a product listing website with a public storefront and an owner-managed admin area, backed by persistent product storage on the Internet Computer.

**Planned changes:**
- Implement a Motoko backend product data model with CRUD methods, including timestamps and optional imageUrl.
- Add read-only query methods for listing products and fetching product details by id.
- Add owner-only authorization for create/update/delete using Internet Identity principals, with a defined initial owner mechanism.
- Ensure product data persists across canister upgrades via stable storage patterns.
- Build a responsive public storefront UI: product grid/list and a product details view, using a placeholder image when imageUrl is missing.
- Build an authenticated admin area (Internet Identity) to add, edit, and delete products with validation, loading states, and English error/success feedback.
- Wire frontend data fetching and mutations with React Query, including cache invalidation after admin changes.
- Apply a consistent modern e-commerce theme (non-blue/purple default palette) with shared layout elements (header/nav and footer or equivalent).
- Add and reference generated static image assets from `frontend/public/assets/generated` (logo + placeholder + hero background).

**User-visible outcome:** Visitors can browse a responsive product catalog and view product details, while the authenticated owner can log in to an admin area to create, update, and delete products and see changes reflected immediately on the storefront.
