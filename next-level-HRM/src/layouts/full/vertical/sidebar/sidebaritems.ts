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
    heading: 'heading_home',
    children: [
      {
        name: `menu_dashboard`,
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/admin',
        isPro: false,
      },
    ],
  },

  {
    heading: 'heading_pages',
    children: [
      {
        name: 'menu_employee',
        icon: 'solar:users-group-rounded-linear',
        id: uniqueId(),
        url: '/admin/utilities/employee',
      },
      {
        id: uniqueId(),
        name: 'menu_attendance',
        icon: 'solar:calendar-mark-linear',
        url: '/admin/utilities/attendances',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'menu_leave_request',
        icon: 'solar:document-add-linear',
        url: '/admin/utilities/leave-requests',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'menu_payroll',
        icon: 'solar:wallet-money-linear',
        url: '/admin/utilities/payrolls',
        isPro: false,
      },
    ],
  },
];

export default SidebarContent;
