const CategoryCard = ({category}) => {
    const {_id, name} = category;

  return (
    <>
        <label
            key={_id}
            className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
        >
            <input
            type="checkbox"
            // checked={selectedCategories.includes(category)}
            // onChange={() => handleCategoryChange(category)}
            className="h-4 w-4 rounded border-gray-300 accent-orange-500"
            />
            <span>{name}</span>
        </label>
    </>
  )
}

export default CategoryCard
