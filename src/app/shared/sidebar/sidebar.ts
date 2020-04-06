import { faTachometerAlt, faFileInvoiceDollar, faChartLine, faRoute, faMap, faLandmark } from '@fortawesome/free-solid-svg-icons';

export const sidebarMenu = [
    {
        id: 0,
        name: 'Dashboard',
        url: '/dashboard',
        icon: faTachometerAlt
    }, 
    {
        id: 1,
        name: 'Wydatki',
        url: '/list/expenses',
        icon: faFileInvoiceDollar,
        add: '/add/expense'
    },
    {
        id: 2,
        name: 'Przychody',
        url: '/list/incomes',
        icon: faChartLine,
        add: '/add/income'
    },
    {
        id: 3,
        name: 'Paliwo',
        url: '/list/refill',
        icon: faRoute,
        add: '/add/refill'
    },
    {
        id: 4,
        name: 'Podróże',
        url: '/travel',
        icon: faMap
    },
    {
        id: 4,
        name: 'Stałe wydatki',
        url: '/list/fixed-expenses',
        icon: faFileInvoiceDollar
    },
    {
        id: 5,
        name: 'Kredyty',
        url: '/loan',
        icon: faLandmark
    }
];
