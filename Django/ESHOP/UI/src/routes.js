import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';

import Media from './pages/Media';
import EditMedia from './pages/EditMedia';
import AddMedia from './pages/AddMedia';

import AddAboutUs from './pages/AddAbout';
import Parties from './pages/Parties';
import Items from './pages/Items';
import Purchase from './pages/Purchase';
import Sale from './pages/Sales';
import Expenses from './pages/Expenses';
import PurchaseOrder from './pages/PurchaseOrder';
import PurchaseBill from './pages/PurchaseBills';
import SaleBill from './pages/SaleBills';
import CustomerOrder from './pages/SaleOrders';
import Inventory from './pages/Inventory';
// ----------------------------------------------------------------------
export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },

        // parties
        { path: 'party', element: <Parties /> },

        // items
        { path: 'item', element: <Items /> },

        // purchase
        { path: 'purchase-payments', element: <Purchase /> },
        { path: 'purchase-orders', element: <PurchaseOrder /> },
        { path: 'purchase-bills', element: <PurchaseBill /> },

        // sales
        { path: 'sale-payments', element: <Sale /> },
        { path: 'sale-invoices', element: <SaleBill /> },
        { path: 'sale-orders', element: <CustomerOrder /> },

        // expenses
        { path: 'expense', element: <Expenses /> },

        // inventory
        { path: 'inventory', element: <Inventory /> },

        { path: 'media', element: <Media /> },
        { path: 'media/:id', element: <EditMedia /> },
        { path: 'media/add', element: <AddMedia /> },

        { path: 'about/add', element: <AddAboutUs /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/dashboard" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
