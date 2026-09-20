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
    children: [
      {
        name: 'menu_dashboard',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/',
      },
      {
        name: 'menu_attendance',
        icon: 'solar:calendar-mark-linear',
        id: uniqueId(),
        url: '/attendance',
      },
      {
        name: 'menu_leave_request',
        icon: 'solar:document-add-linear',
        id: uniqueId(),
        url: '/leave-request',
      },
      {
        name: 'menu_payroll',
        icon: 'solar:wallet-money-linear',
        id: uniqueId(),
        url: '/payroll',
      },
      {
        name: 'menu_settings',
        icon: 'solar:settings-linear',
        id: uniqueId(),
        url: '/admin',
      },
    ],
  }
];

export default SidebarContent;
