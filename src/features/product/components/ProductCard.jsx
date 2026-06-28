const ProductCard = ({ product }) => {
  const {price, title} = product;
  const {image, slug, name} = product.category;

  return (  

    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="mb-3 h-40 rounded-md bg-gray-100">
        <img
          src={image}
          alt={slug}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="line-clamp-1 text-sm font-semibold text-gray-800">
        {name}
      </h3>

      <p className="mt-1 text-sm text-gray-500">{title}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-semibold text-gray-900">${price}</span>

        <button className="rounded-md bg-orange-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-600">
          Add
        </button>
      </div>
    </div>
  )}

export default ProductCard