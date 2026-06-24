import { createContext, useMemo, useState } from "react";

const NavbarContext = createContext(false);

export const NavbarContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const navClassActive = ({isActive}) => {
        return isActive ? "text-orange-300 font-semibold border-b-2 border-orange-300" : "text-gray-700 hover:text-orange-300";
    }

    const value = useMemo(() => {
        return {
            isOpen, setIsOpen, navClassActive
        };
    }, [isOpen])

    return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
}

export default NavbarContext
