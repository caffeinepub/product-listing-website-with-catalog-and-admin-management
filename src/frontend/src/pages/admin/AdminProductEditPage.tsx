import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { useGetProduct } from '../../hooks/useQueries';
import { useUpdateProduct, useDeleteProduct } from '../../hooks/useProductMutations';
import ProductForm from '../../components/admin/ProductForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog';
import { Loader2, ArrowLeft, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { toast } from 'sonner';

export default function AdminProductEditPage() {
  const { productId } = useParams({ from: '/admin/edit/$productId' });
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProduct(BigInt(productId));
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleSubmit = async (data: { name: string; description: string; owner: string; price: bigint }) => {
    try {
      await updateProduct.mutateAsync({ id: BigInt(productId), ...data });
      toast.success('Product updated successfully');
      navigate({ to: '/admin' });
    } catch (error: any) {
      toast.error(`Failed to update product: ${error.message}`);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(BigInt(productId));
      toast.success('Product deleted successfully');
      navigate({ to: '/admin' });
    } catch (error: any) {
      toast.error(`Failed to delete product: ${error.message}`);
    }
  };

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

  if (error || !product) {
    return (
      <div className="container py-12 max-w-2xl">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load product. The product may not exist.
          </AlertDescription>
        </Alert>
        <Link to="/admin" className="mt-6 inline-block">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Button>
        </Link>
      </div>
    );
  }

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
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Edit Product</CardTitle>
              <CardDescription>
                Update the product details below.
              </CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={deleteProduct.isPending}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{product.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          <ProductForm
            product={product}
            onSubmit={handleSubmit}
            submitLabel="Update Product"
            isSubmitting={updateProduct.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
