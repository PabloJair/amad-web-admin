import { BreadcrumbItem } from '@amad-web-admin/modules/ui-elements';
import { NavigationRoutes } from '@amad-web-admin/modules/core';

export function getBreadcrumbInformationPersonal(): BreadcrumbItem[] {
  return [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Proyectos',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}/${NavigationRoutes.projects.PROJECT}`,
    },
    { color: 'text-yellow-600', name: 'Información personal' },
  ];
}
