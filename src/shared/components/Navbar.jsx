import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import NavbarContext from "../../context/NavbarContext";
import { navClassActive } from "../utils/navClassHelper";

const Navbar = () => {
    const {setIsOpen} = useContext(NavbarContext);
    const navigate = useNavigate();

    return (
        <>
        {/* Left: Brand Logo */}
        <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
            BrandLogo
            </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
            <NavLink to={"/"} className={navClassActive}>Home</NavLink>
            <NavLink to={"/products"} className={navClassActive}>Products</NavLink>
            <NavLink to={"/contact"} className={navClassActive}>Contact</NavLink>
            <NavLink to={"/about"} className={navClassActive}>About</NavLink>
        </nav>

        {/* Right: Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
            <Link
            to="/login"
            className="text-gray-700 font-medium transition hover:text-orange-300"
            >
            Login
            </Link>
            <button className="relative text-gray-700 transition hover:text-orange-300 cursor-pointer" onClick={() => navigate('/cart')}>
                <span className="font-medium">Cart</span>
                <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-300 text-xs text-white">
                    2
                </span>
            </button>
        </div>

        {/* Mobile Menu Button */}
        <button
            className="md:hidden text-gray-800"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
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
                d="M4 6h16M4 12h16M4 18h16"
            />
            </svg>
        </button>
        </>
    );
};

export default Navbar;
