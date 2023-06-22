import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Products from "./products/Products";
import App from "./App";
import LoginForm from "./loginForm/LoginForm";
import Stats from "./stats/Stats";
import Groups from "./groups/Groups";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/stats",
                element: <Stats />,
            },
            {
                path: "/auth",
                element: <LoginForm />,
            },
            {
                path: "/groups",
                element: <Groups />,
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
