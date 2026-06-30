import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductSkeletonGrid = ({count = 12}) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
}

export default ProductSkeletonGrid
