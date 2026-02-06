import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { Package, Plus } from 'lucide-react';

export default function AdminEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <Package className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">No products yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Get started by creating your first product. Add details, set a price, and start building your catalog.
      </p>
      <Link to="/admin/new">
        <Button size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Create Your First Product
        </Button>
      </Link>
    </div>
  );
}
