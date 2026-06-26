import { createContext, useCallback, useMemo, useState } from "react";

const LoaderContext = createContext(false);

export const LoaderContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false);

    const showLoader = useCallback(() => {
        setLoading(true)
    }, []);

    const hideLoader = useCallback(() => {
        setLoading(false);
    }, [])

    const value = useMemo(() => {
        return {
            loading, showLoader, hideLoader
        }
    }, [loading, showLoader, hideLoader])

    return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
}

export default LoaderContext;