const ProductCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm animate-pulse my-6">
      <div className="mb-4 h-44 w-full rounded-lg bg-gray-200" />
      <div className="mb-3 h-4 w-3/4 rounded bg-gray-200" />
      <div className="mb-4 h-3 w-2/3 rounded bg-gray-200" />
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 rounded bg-gray-200" />
        <div className="h-9 w-24 rounded-lg bg-gray-200" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
