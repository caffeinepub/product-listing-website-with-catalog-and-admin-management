import { useParams, Link } from '@tanstack/react-router';
import { useGetProduct } from '../hooks/useQueries';
import ProductImage from '../components/ProductImage';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { formatPrice } from '../lib/format';

export default function ProductDetailsPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const { data: product, isLoading, error } = useGetProduct(BigInt(productId));

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load product details. The product may not exist or there was a connection error.
          </AlertDescription>
        </Alert>
        <Link to="/" className="mt-6 inline-block">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12">
        <p className="text-center text-muted-foreground">Product not found</p>
        <div className="flex justify-center mt-6">
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Link to="/" className="inline-block mb-8">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          <ProductImage
            imageUrl=""
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">by {product.owner}</p>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
            <div className="text-3xl font-bold mb-6">{formatPrice(product.price)}</div>
            
            <Separator className="my-6" />
            
            <div>
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.description || 'No description available.'}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button size="lg" className="w-full">
              Contact Seller
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Product ID: {product.id.toString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
