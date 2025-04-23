import ProductGrid from "@/components/product-grid"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-center">All Products</h1>
      <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
        Browse our collection of premium clothing and accessories
      </p>
      <ProductGrid />
    </div>
  )
}
