import { Dashboard } from './views/Dashboard';
import { Dota } from './views/Dota';

export const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    title: 'Dashboard',
    icon: 'fas fa-tachometer-alt fa-2x text-white'
  },
  {
    path: '/dota',
    component: Dota,
    title: 'Dota',
    icon: 'fab fa-steam fa-2x text-white'
  }
];
