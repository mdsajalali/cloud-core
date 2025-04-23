"use client"

import { memo } from "react"
import type { Product } from "@/types"
import ProductImageGallery from "@/components/product-image-gallery"
import { ShoppingCartIcon, CreditCardIcon } from "@/components/icons"

interface ProductDetailsProps {
  product: Product
  onAddToCart: () => void
  onBuyNow: () => void
}

const ProductDetails = ({ product, onAddToCart, onBuyNow }: ProductDetailsProps) => {
  // Calculate discount percentage if available
  const discountPercentage =
    product.is_discount && product.discount_amount
      ? Math.round((Number.parseInt(product.discount_amount || "0") / (product.price || 1)) * 100)
      : 0

  // Get all product images
  const productImages = [
    { id: 1, url: `https://admin.refabry.com/storage/product/${product.image || ""}` },
    ...(product.product_images?.map((img) => ({
      id: img.id,
      url: `https://admin.refabry.com/storage/product/${img.name || ""}`,
    })) || []),
  ]

  // Remove duplicates
  const uniqueImages = productImages.filter((img, index, self) => index === self.findIndex((t) => t.url === img.url))

  return (
    <>
      <div className="order-1 lg:order-1">
        <ProductImageGallery images={uniqueImages} />
      </div>

      <div className="order-2 lg:order-2 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="sm:text-3xl text-[20px] font-bold">{product.name}</h1>
            {product.stock > 0 ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border border-green-200 dark:border-green-800">
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border border-red-200 dark:border-red-800">
                Out of Stock
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <p className="text-3xl font-bold">৳{product.price}</p>
            {product.is_discount > 0 && product.discount_amount && (
              <p className="text-gray-500 dark:text-gray-400 line-through text-xl">
                ৳{product.price + Number.parseInt(product.discount_amount)}
              </p>
            )}
            {discountPercentage > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border border-red-200 dark:border-red-800">
                {discountPercentage}% OFF
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="flex-1 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 font-medium py-3 px-6 rounded-md flex items-center justify-center transition-colors"
              onClick={onAddToCart}
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center transition-colors"
              onClick={onBuyNow}
            >
              <CreditCardIcon className="w-5 h-5 mr-2" />
              Buy Now
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          {product.short_desc && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{product.short_desc}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-800 rounded-md p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
              <p className="font-medium">{product.category?.name || "Uncategorized"}</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-800 rounded-md p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Product Code</p>
              <p className="font-medium">{product.code || "N/A"}</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-800 rounded-md p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">SKU</p>
              <p className="font-medium">{product.unique_id || "N/A"}</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-800 rounded-md p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Stock</p>
              <p className="font-medium">{product.stock} units</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(ProductDetails)
