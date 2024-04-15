import { Navigate, useLocation, Outlet } from "react-router-dom";

const AuthenticatedRoute = () => {
    const isAuthorized = !!localStorage.getItem("TOKEN");
    const location = useLocation();

    if (!isAuthorized) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    redirectTo: location,
                }}
            />
        );
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthenticatedRoute;
