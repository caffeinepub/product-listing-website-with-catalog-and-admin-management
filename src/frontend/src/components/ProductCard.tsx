import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import ProductImage from './ProductImage';
import { formatPrice } from '../lib/format';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link to="/product/$productId" params={{ productId: product.id.toString() }}>
        <div className="aspect-square overflow-hidden bg-muted">
          <ProductImage
            imageUrl=""
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to="/product/$productId" params={{ productId: product.id.toString() }}>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>
        <p className="text-xs text-muted-foreground mt-2">by {product.owner}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
        <Link to="/product/$productId" params={{ productId: product.id.toString() }}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
