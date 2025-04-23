export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="order-2 lg:order-1">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800 animate-pulse" />

        <div className="flex gap-4 overflow-x-auto mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-2 space-y-6">
        <div>
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4 mb-4" />
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/3 mb-4" />

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse flex-1" />
            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse flex-1" />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/4 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-full mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-full mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4 mb-6" />

          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-md p-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/2 mb-2" />
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
