export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm h-full flex flex-col">
      <div className="aspect-square relative bg-gray-200 dark:bg-gray-800 animate-pulse" />

      <div className="p-4 flex-grow">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2 w-3/4" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/3" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/4" />
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/5 mt-2" />
      </div>

      <div className="p-4 pt-0 mt-auto">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-full" />
      </div>
    </div>
  )
}
