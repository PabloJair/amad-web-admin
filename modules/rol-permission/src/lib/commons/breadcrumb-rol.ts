import { BreadcrumbItem } from '@amad-web-admin/modules/ui-elements';
import { NavigationRoutes } from '@amad-web-admin/modules/core';

export function listBreadcrumb(): BreadcrumbItem[] {
  return [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Roles y permisos',
    },
    {
      color: 'text-red-600',
      name: 'Lista de roles y permisos',
    },
  ];
}

export function editBreadcrumb(): BreadcrumbItem[] {
  return [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Rol',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}/${NavigationRoutes.rolesAndPermission.ROLES_LIST}`,
    },
    {
      color: 'text-yellow-600',
      name: 'Editar Rol',
    },
  ];
}
