import { BreadcrumbItem } from '@amad-web-admin/modules/ui-elements';
import { NavigationRoutes } from '@amad-web-admin/modules/core';

export const editBreadcrumb: BreadcrumbItem[] = [
  {
    color: 'text-blue-600',
    name: 'Dashboard',
    link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
  },
  {
    color: 'text-blue-600',
    name: 'Usuarios',
    link: `/${NavigationRoutes.dashboard.DASHBOARD}/${NavigationRoutes.userRoutes.USER}`,
  },
  {
    color: 'text-yellow-600',
    name: 'Editar Usuario',
  },
];
export const listBreadcrumbItems: BreadcrumbItem[] = [
  {
    color: 'text-blue-600',
    name: 'Dashboard',
    link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
  },
  {
    color: 'text-blue-600',
    name: 'Usuarios',
  },
  {
    color: 'text-red-600',
    name: 'Lista de usuarios',
  },
];
