import { useGetAllProducts } from '../hooks/useQueries';
import ProductCard from '../components/ProductCard';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

export default function StorefrontPage() {
  const { data: products, isLoading, error } = useGetAllProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-24 md:py-32"
        style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x800.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/95" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-muted-foreground">
              Browse our curated collection of quality products from trusted brands.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Our Products</h2>
          <p className="text-muted-foreground mt-2">
            Explore our full range of products
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load products. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && products && products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No products available yet. Check back soon!
            </p>
          </div>
        )}

        {!isLoading && !error && products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id.toString()} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
