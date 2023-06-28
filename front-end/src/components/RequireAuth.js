import {useLocation, Navigate, Outlet} from 'react-router-dom';
import {useBankContext} from '../utils/BankContext.jsx';

function RequireAuth() {
    let auth = useBankContext();
    let location = useLocation();

    if(!auth.user) {
        return <Navigate to='/createaccount' state={{from: { pathname: "/createaccount"}}} />
    }

    return <Outlet />
}

export default RequireAuth;