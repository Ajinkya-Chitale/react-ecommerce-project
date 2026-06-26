import { useContext, useEffect } from "react";
import LoaderContext from "../../context/LoaderContext";

const Loader = () => {
    const {loading} = useContext(LoaderContext);

    useEffect(() => {    
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [loading])

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="loader"></div>
        </div>
    )
}

export default Loader
