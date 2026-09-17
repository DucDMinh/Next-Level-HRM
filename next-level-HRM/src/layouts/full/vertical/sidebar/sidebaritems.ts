export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: string;
  children?: ChildItem[];
  item?: unknown;
  url?: string;
  color?: string;
  disabled?: boolean;
  subtitle?: string;
  badge?: boolean;
  badgeType?: string;
  isPro?: boolean;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: string;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: string;
  disabled?: boolean;
  subtitle?: string;
  badgeType?: string;
  badge?: boolean;
  isPro?: boolean;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  {
    heading: 'Home',
    children: [
      {
        name: 'Dashboard',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/admin',
        isPro: false,
      },
    ],
  },

  {
    heading: 'pages',
    children: [
      {
        name: 'Employee',
        icon: 'solar:server-linear',
        id: uniqueId(),
        url: '/admin/utilities/employee',
      },
      {
        id: uniqueId(),
        name: 'Attendance',
        icon: 'solar:user-circle-linear',
        url: '/admin/utilities/attendances',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'Leave Request',
        icon: 'solar:user-circle-linear',
        url: '/admin/utilities/leave-requests',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'Payroll',
        icon: 'solar:user-circle-linear',
        url: '/admin/utilities/payrolls',
        isPro: false,
      },
    ],
  },
  {
    heading: 'Account',
    children: [
      {
        name: 'Settings',
        icon: 'solar:settings-2-linear',
        id: uniqueId(),
        url: '/admin/account/settings',
      },
    ]
  }
];

export default SidebarContent;
