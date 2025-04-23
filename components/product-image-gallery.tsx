"use client"

import { useState, memo } from "react"
import Image from "next/image"

interface ProductImageGalleryProps {
  images: { id: number; url: string }[]
}

const ProductImageGallery = ({ images }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]?.url || "")

  return (
    <div className="grid gap-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
        <Image
          src={selectedImage || "/placeholder.svg?height=600&width=600"}
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex px-1 gap-4 overflow-x-auto">
          {images.map((image) => (
            <button
              key={image.id}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                selectedImage === image.url
                  ? "ring-2 ring-blue-500  ring-offset-2"
                  : "border-gray-200 dark:border-gray-800"
              }`}
              onClick={() => setSelectedImage(image.url)}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt="Product thumbnail"
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(ProductImageGallery)
