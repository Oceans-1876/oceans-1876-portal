import React from 'react';

import { withLayout } from './components/Layouts/utils';
import MainLayout from './components/Layouts/MainLayout';
import Home from './components/Home';
import { Header as HomeHeader } from './components/Home/layout';

const routes: { [key: string]: import('react-router-dom').RouteProps } = {
    '/': {
        exact: true,
        component: withLayout(MainLayout, Home, { header: <HomeHeader /> })
    }
};

export default routes;
