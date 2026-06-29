import { useContext } from "react";
import ProductContext from "../../../context/ProductContext";

const CategoryCard = ({category}) => {
    const {_id, name} = category;
    const {filter, setFilter} = useContext(ProductContext);

    const handleCategoryChange = (categoryId) => {
        setFilter((prev) => {
            const isSelected = prev.selectedCategories.includes(categoryId);

            return {
                ...prev,
                selectedCategories: isSelected 
                ? prev.selectedCategories.filter((item) => item !== categoryId)
                : [...prev.selectedCategories, categoryId]
            }
        })
    }

  return (
    <>
        <label
            key={_id}
            className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
        >
            <input
            type="checkbox"
            checked={filter.selectedCategories.includes(category._id)}
            onChange={() => handleCategoryChange(category._id)}
            className="h-4 w-4 rounded border-gray-300 accent-orange-500"
            />
            <span>{name}</span>
        </label>
    </>
  )
}

export default CategoryCard
