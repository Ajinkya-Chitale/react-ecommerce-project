import { useContext } from "react";
import NavbarContext from "../../context/NavbarContext";
import { Link, NavLink, useNavigate } from "react-router";

const MobileMenu = () => {
    const {isOpen, setIsOpen, navClassActive} = useContext(NavbarContext);
    const navigate = useNavigate();

    return (
        <>
        {/* Mobile Sidebar Overlay */}
        <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
            isOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
            onClick={() => setIsOpen(false)}
        ></div>

        {/* Mobile Sidebar */}
        <div
            className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-lg transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="flex items-center justify-between border-b px-5 py-4">
                <h2 className="text-xl font-bold text-gray-800">BrandLogo</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="text-gray-700"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
            </div>

            <nav className="flex flex-col gap-4 px-5 py-6">
                <NavLink to={"/"} className={navClassActive}>Home</NavLink>
                <NavLink to={"/products"} className={navClassActive}>Products</NavLink>
                <NavLink to={"/contact"} className={navClassActive}>Contact</NavLink>
                <NavLink to={"/about"} className={navClassActive}>About</NavLink>
            </nav>

            <div className="border-t px-5 py-6">
            <Link
                to="/login"
                className="mb-4 block text-gray-700 font-medium transition hover:text-blue-600"
            >
                Login
            </Link>

            <button className="relative text-gray-700 font-medium transition hover:text-blue-600" onClick={() => navigate('/cart')}>
                Cart
                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                2
                </span>
            </button>
            </div>
        </div>
        </>
    );
};

export default MobileMenu;
