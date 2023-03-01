import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import flashOutline from '@iconify/icons-eva/flash-outline';
import calendarOutline from '@iconify/icons-eva/calendar-outline';
import fileTextOutline from '@iconify/icons-eva/file-text-outline';
import creditCardFilled from '@iconify/icons-ant-design/credit-card-filled';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import bookOutline from '@iconify/icons-eva/book-outline';
import imageFill from '@iconify/icons-eva/image-fill';
import listFill from '@iconify/icons-eva/list-fill';
import starOutline from '@iconify/icons-eva/star-outline';
import castFill from '@iconify/icons-eva/cast-fill';
import homeFill from '@iconify/icons-eva/home-fill';
import barChart2Outline from '@iconify/icons-eva/bar-chart-2-outline';
import emailOutline from '@iconify/icons-eva/email-outline';
import clipboardOutline from '@iconify/icons-eva/clipboard-outline';
import shoppingBagOutline from '@iconify/icons-eva/shopping-bag-outline';
import peopleOutline from '@iconify/icons-eva/people-outline';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import listOutline from '@iconify/icons-eva/list-outline';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'home',
    path: '/dashboard/app',
    icon: getIcon(homeFill)
  },
  {
    title: 'Parties',
    path: '/dashboard/party',
    icon: getIcon(peopleOutline)
  },
  {
    title: 'Items',
    path: '/dashboard/item',
    icon: getIcon(listOutline)
  },
  {
    title: 'Purchase',
    path: '/dashboard/purchase',
    icon: getIcon(shoppingBagOutline),
    children: [
      {
        title: 'Purchase Orders',
        path: '/dashboard/purchase-orders',
        icon: getIcon(homeFill)
      },
      {
        title: 'Purchase Bills',
        path: '/dashboard/purchase-bills',
        icon: getIcon(homeFill)
      },
      {
        title: 'Supplier Payment',
        path: '/dashboard/purchase-payments',
        icon: getIcon(homeFill)
      }
    ]
  },
  {
    title: 'Sales',
    path: '/dashboard/sale',
    icon: getIcon(flashOutline),
    children: [
      {
        title: 'Customer Orders',
        path: '/dashboard/sale-orders',
        icon: getIcon(homeFill)
      },
      {
        title: 'Sale Invoices',
        path: '/dashboard/sale-invoices',
        icon: getIcon(homeFill)
      },
      {
        title: 'Customer Payment',
        path: '/dashboard/sale-payments',
        icon: getIcon(homeFill)
      }
    ]
  },
  {
    title: 'Expenses',
    path: '/dashboard/expense',
    icon: getIcon(creditCardFilled)
  },
  {
    title: 'Inventory',
    path: '/dashboard/inventory',
    icon: getIcon(bookOutline)
  },
  {
    title: 'Reports',
    path: '/dashboard/media',
    icon: getIcon(barChart2Outline)
  }
];

export default sidebarConfig;
