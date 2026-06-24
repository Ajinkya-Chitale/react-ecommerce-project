import { NavbarContextProvider } from "../../context/NavbarContext"
import MobileMenu from "./MobileMenu"
import Navbar from "./Navbar"

const Header = () => {
  return (
    <>
      <NavbarContextProvider>
        <header className="w-full border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
            <Navbar />
          </div>
        </header>

        <MobileMenu />
      </NavbarContextProvider>
    </>
  )
}

export default Header
