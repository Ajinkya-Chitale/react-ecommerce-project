import { createBrowserRouter } from "react-router";
import MainLayout from "../shared/layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Products from "../pages/Products";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Cart from "../pages/Cart";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "products",
                element: <Products />
            },
            {
                path: "cart",
                element: <Cart />
            }
        ]
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;