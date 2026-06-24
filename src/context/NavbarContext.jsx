import { createContext, useMemo, useState } from "react";

const NavbarContext = createContext(false);

export const NavbarContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const value = useMemo(() => {
        return {
            isOpen, setIsOpen
        };
    }, [isOpen])

    return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
}

export default NavbarContext
