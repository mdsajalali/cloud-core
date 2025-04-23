import ProductGrid from "@/components/product-grid"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-center mb-2">Featured Products</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Discover our collection of premium clothing
          </p>
          <ProductGrid limit={8} />
        </div>
      </div>
    </div>
  )
}
