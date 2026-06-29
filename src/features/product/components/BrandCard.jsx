import { useContext } from "react";
import ProductContext from "../../../context/ProductContext";

const BrandCard = ({brand}) => {
    const {_id, name} = brand
    const {filter, setFilter} = useContext(ProductContext);

    const handleBrandChange = (brandId) => {
        setFilter((prev) => {
            const isSelected = filter.selectedBrands.includes(brandId);

            return {
                ...prev,
                selectedBrands: isSelected
                ? filter.selectedBrands.filter((item) => item !== brandId)
                : [...prev.selectedBrands, brandId]
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
                checked={filter.selectedBrands.includes(brand._id)}
                onChange={() => handleBrandChange(brand._id)}
                className="h-4 w-4 rounded border-gray-300 accent-orange-500"
                />
                <span>{name}</span>
            </label>
        </>
    )
}

export default BrandCard
