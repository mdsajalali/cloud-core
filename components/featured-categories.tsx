import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedCategories() {
  const categories = [
    { id: 1, name: "Winter Jackets", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Hoodies", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "T-Shirts", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Accessories", image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-2">Shop by Category</h2>
      <p className="text-center text-muted-foreground mb-8">Browse our collection by category</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/products?category=${category.id}`}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500">Image</span>
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold">{category.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
