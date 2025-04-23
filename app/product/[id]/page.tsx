"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchSingleProduct } from "@/redux/features/productSlice"
import ProductDetails from "@/components/product-details"
import ProductSkeleton from "@/components/product-skeleton"
import Link from "next/link"
import { toast } from "sonner"
import { addToCart } from "@/redux/features/cartSlice"
import { ArrowLeftIcon } from "@/components/icons"

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { singleProduct, loading, error } = useAppSelector((state) => state.products)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (id) {
      dispatch(fetchSingleProduct(id as string))
    }
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (singleProduct) {
      dispatch(
        addToCart({
          id: singleProduct.id,
          name: singleProduct.name,
          price: singleProduct.price,
          image: singleProduct.image,
          quantity: 1,
        }),
      )
      toast.success(`${singleProduct.name} added to cart`)
    }
  }

  const handleBuyNow = () => {
    if (singleProduct) {
      dispatch(
        addToCart({
          id: singleProduct.id,
          name: singleProduct.name,
          price: singleProduct.price,
          image: singleProduct.image,
          quantity: 1,
        }),
      )
      router.push("/cart")
    }
  }

  if (!isClient || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/products" className="inline-block mb-6">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-md transition-colors">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Products
          </button>
        </Link>
        <ProductSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
          <p className="mb-6">{error}</p>
          <Link href="/products">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    )
  }

  if (!singleProduct) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link href="/products">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-block mb-6">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-md transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Products
        </button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductDetails product={singleProduct} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
      </div>
    </div>
  )
}
