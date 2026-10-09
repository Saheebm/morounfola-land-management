import { createBrowserRouter } from 'react-router';
import { CitizenLayout } from './layouts/CitizenLayout';
import { StaffLayout } from './layouts/StaffLayout';
import { KitchenSink } from './pages/KitchenSink';
import { Services } from './pages/citizen/Services';
import { LandRecords } from './pages/citizen/LandRecords';
import { Notices } from './pages/citizen/Notices';
import { ServiceStatus } from './pages/citizen/ServiceStatus';
import { DolilLekhokDashboard } from './pages/dolil-lekhok/Dashboard';
import { SubRegistrarDashboard } from './pages/sub-registrar/Dashboard';
import { MutationOfficerDashboard } from './pages/mutation-officer/Dashboard';
import { AdminDashboard } from './pages/admin/Dashboard';

export const router = createBrowserRouter([
  // Citizen Portal Routes
  {
    path: '/',
    element: <CitizenLayout />,
    children: [
      { index: true, element: <Services /> },
      { path: 'citizen/services', element: <Services /> },
      { path: 'citizen/land-records', element: <LandRecords /> },
      { path: 'citizen/map', element: <ServiceStatus /> },
      { path: 'citizen/notices', element: <Notices /> },
      { path: 'citizen/track', element: <ServiceStatus /> },
      { path: 'citizen/land-tax', element: <ServiceStatus /> },
      { path: 'kitchen-sink', element: <KitchenSink /> },
    ],
  },

  // Staff Console Routes
  {
    path: '/staff',
    element: <StaffLayout />,
    children: [
      { path: 'dolil-lekhok', element: <DolilLekhokDashboard /> },
      { path: 'dolil-lekhok/create', element: <DolilLekhokDashboard /> },
      { path: 'sub-registrar', element: <SubRegistrarDashboard /> },
      { path: 'mutation-officer', element: <MutationOfficerDashboard /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'admin/users', element: <AdminDashboard /> },
      { path: 'admin/notices', element: <AdminDashboard /> },
    ],
  },
]);
