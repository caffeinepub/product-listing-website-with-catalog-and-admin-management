import { useNavigate, Link } from '@tanstack/react-router';
import { useCreateProduct } from '../../hooks/useProductMutations';
import ProductForm from '../../components/admin/ProductForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminProductNewPage() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();

  const handleSubmit = async (data: { name: string; description: string; owner: string; price: bigint }) => {
    try {
      await createProduct.mutateAsync(data);
      toast.success('Product created successfully');
      navigate({ to: '/admin' });
    } catch (error: any) {
      toast.error(`Failed to create product: ${error.message}`);
      throw error;
    }
  };

  return (
    <div className="container py-12 max-w-2xl">
      <Link to="/admin" className="inline-block mb-8">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
          <CardDescription>
            Add a new product to your catalog. Fill in the details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm
            onSubmit={handleSubmit}
            submitLabel="Create Product"
            isSubmitting={createProduct.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
