import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from 'react-router-dom';
import Cabinet from './pages/cabinet';
import Appointment from './pages/cabinet/appointment';
import LandingPage from './pages/landing';
import Login from './pages/login';
import Signup from './pages/signup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AuthenticatedRoutes from './components/ProtectedRoute';
import DoctorCabinet from './pages/doctor/cabinet';
import AboutUsPage from './pages/cabinet/about-us';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/">
                <Route index element={<LandingPage />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="cabinet/appointment" element={<Appointment />} />
                <Route path="about-us" element={<AboutUsPage />} />
            </Route>
            <Route element={<AuthenticatedRoutes />}>
                <Route path="/cabinet" element={<Cabinet />} />
                <Route path="/doctor/cabinet" element={<DoctorCabinet />} />
            </Route>
        </>
    )
);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
        </QueryClientProvider>
    );
}

export default App;
