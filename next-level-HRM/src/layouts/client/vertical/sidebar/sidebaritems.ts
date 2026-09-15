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
        name: 'Dashboard',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/',
      },
      {
        name: 'Attendance',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/attendance',
      },
      {
        name: 'Leave Requests',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/leave-request',
      },
      {
        name: 'Workdays & Payroll',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/admin',
      },
      {
        name: 'Settings',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/admin',
      },
    ],
  }
];

export default SidebarContent;
