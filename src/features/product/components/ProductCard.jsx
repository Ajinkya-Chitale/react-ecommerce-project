const ProductCard = ({ product }) => {
  const {price, title} = product;
  const {image, slug, name} = product.category;

  return (  
    <div className='w-[207px]'>
      <div className="w-full h-\[263px\] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={slug}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-400">{name}</p>
        <h3 className="mt-1 text-lg font-semibold text-gray-900 leading-none">{title}</h3>
        <p className="mt-3 text-base text-gray-700">${price}</p>
      </div>
    </div>
  )}

export default ProductCard