"use client"

import { memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAppDispatch } from "@/redux/hooks"
import { addToCart } from "@/redux/features/cartSlice"
import type { Product } from "@/types"
import { toast } from "sonner"
import { ShoppingCartIcon } from "@/components/icons"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    )
    toast.success(`${product.name} added to cart`)
  }

  // Calculate discount percentage if available
  const discountPercentage =
    product.is_discount && product.discount_amount
      ? Math.round((Number.parseInt(product.discount_amount || "0") / (product.price || 1)) * 100)
      : 0

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link href={`/product/${product.id}`} className="flex-shrink-0">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={`https://admin.refabry.com/storage/product/${product.image}`}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4 flex-grow">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-bold text-lg">৳{product.price}</p>
          {product.is_discount > 0 && product.discount_amount && (
            <p className="text-gray-500 dark:text-gray-400 line-through text-sm">
              ৳{product.price + Number.parseInt(product.discount_amount)}
            </p>
          )}
        </div>
        {discountPercentage > 0 && (
          <span className="inline-block bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 text-xs font-medium px-2 py-0.5 rounded mt-2">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      <div className="p-4 pt-0 mt-auto">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition-colors"
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default memo(ProductCard)
