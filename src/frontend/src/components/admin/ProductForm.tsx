import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import type { Product } from '../../backend';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: { name: string; description: string; owner: string; price: bigint }) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
}

export default function ProductForm({ product, onSubmit, submitLabel, isSubmitting }: ProductFormProps) {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [owner, setOwner] = useState(product?.owner || '');
  const [priceStr, setPriceStr] = useState(product ? (Number(product.price) / 100).toFixed(2) : '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setOwner(product.owner);
      setPriceStr((Number(product.price) / 100).toFixed(2));
    }
  }, [product]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!owner.trim()) {
      newErrors.owner = 'Brand/Owner is required';
    }

    if (!priceStr.trim()) {
      newErrors.price = 'Price is required';
    } else {
      const price = parseFloat(priceStr);
      if (isNaN(price) || price < 0) {
        newErrors.price = 'Price must be a valid number greater than or equal to 0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const priceInCents = BigInt(Math.round(parseFloat(priceStr) * 100));

    await onSubmit({
      name: name.trim(),
      description: description.trim(),
      owner: owner.trim(),
      price: priceInCents,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="owner">Brand / Owner *</Label>
        <Input
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Enter brand or owner name"
          className={errors.owner ? 'border-destructive' : ''}
        />
        {errors.owner && <p className="text-sm text-destructive">{errors.owner}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price (USD) *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={priceStr}
          onChange={(e) => setPriceStr(e.target.value)}
          placeholder="0.00"
          className={errors.price ? 'border-destructive' : ''}
        />
        {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {submitLabel}...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
