import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return null;
  }

  return (
    <div className="not-prose my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
}
