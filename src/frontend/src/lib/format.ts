export function formatPrice(priceInCents: bigint): string {
  const dollars = Number(priceInCents) / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(dollars);
}
