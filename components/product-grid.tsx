"use client"

import type React from "react"

import { useEffect, useState, useCallback, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchProducts } from "@/redux/features/productSlice"
import ProductCard from "@/components/product-card"
import ProductCardSkeleton from "@/components/product-card-skeleton"
import { SearchIcon } from "@/components/icons"

interface ProductGridProps {
  limit?: number
}

export default function ProductGrid({ limit }: ProductGridProps) {
  const dispatch = useAppDispatch()
  const { products, loading, error } = useAppSelector((state) => state.products)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    dispatch(fetchProducts())
  }, [dispatch])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value || "")
  }, [])

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }, [])

  // Ensure products is an array before filtering
  const productArray = useMemo(() => (Array.isArray(products) ? products : []), [products])

  // Filter and sort products - memoized to prevent unnecessary recalculations
  const filteredAndSortedProducts = useMemo(() => {
    // Filter products by search term
    const filtered = productArray.filter((product) =>
      product?.name?.toLowerCase().includes((searchTerm || "").toLowerCase()),
    )

    // Sort products based on selected sort option
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price
      } else if (sortBy === "price-high") {
        return b.price - a.price
      } else if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name)
      }
      return 0
    })
  }, [productArray, searchTerm, sortBy])

  // Apply limit if provided
  const displayProducts = useMemo(
    () => (limit ? filteredAndSortedProducts.slice(0, limit) : filteredAndSortedProducts),
    [filteredAndSortedProducts, limit],
  )

  if (!isClient || loading) {
    return (
      <div>
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            />
          </div>
          <div className="w-full md:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <option>Sort by</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: limit || 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-48">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {displayProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">No products found</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
