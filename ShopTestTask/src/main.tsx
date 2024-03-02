import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DetailsProduct } from './components/DetailsProduct.tsx';
import { Order } from './components/Order.tsx';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
        path: "/order",
        element: <Order/>
    },
    {
        path: "/details_product",
        element: <DetailsProduct/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)