import { Navigate, useRoutes } from 'react-router-dom';

// Pages
import { useEffect } from 'react';
import { useContextLoginUser } from './lib/hooks';
import HomePage from './pages/home';

export default function Router() {
    const user = useContextLoginUser();

    useEffect(() => {
        const timer = setInterval(() => {
          user.setLoginUser({
            profileId: '0x0e7b',
            address: '0x350061d5B3B09fd44691F22Fd9DEd9a5693Ed41F',
          })
        }, 8000);
    
        return () => {
          clearInterval(timer);
        };
    }, []);

    const routes = useRoutes([
        {
            path: '/',
            element: <HomePage />
        }
    ]);

    return routes;
}
