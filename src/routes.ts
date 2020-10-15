import { withLayout } from './components/Layouts/utils';
import MainLayout from './components/Layouts/MainLayout';
import Home from './components/Home';

const routes: { [key: string]: import('react-router-dom').RouteProps } = {
    '/': {
        exact: true,
        component: withLayout(MainLayout, Home)
    }
};

export default routes;
