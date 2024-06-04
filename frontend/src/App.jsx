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
import DoctorSignUp from './pages/doctor/signup';
import Checkups from './pages/cabinet/checkups';
import FullCheckup from './pages/cabinet/checkups/full-checkup';
import SportsCheckup from './pages/cabinet/checkups/sports-checkup';
import Monitoring from './pages/cabinet/monitoring';
import ViewCheckup from './pages/cabinet/monitoring/view';
import PregnancyCheckup from './pages/cabinet/checkups/pregnancy-checkup';
import PostSurgeryCheckup from './pages/cabinet/checkups/post-surgery-checkup';
import VitamineD3Checkup from './pages/cabinet/checkups/vitamine-d3';
import SettingsPage from './pages/cabinet/settings';
import FaqPage from './pages/cabinet/faq';
import Membership from './pages/membership';
import Articles from './pages/articles';
import Resources from './pages/resources';
import RecordsPage from './pages/cabinet/records';
import CardioCheckup from './pages/cabinet/checkups/cardio';
import GastrointestinalCheckup from './pages/cabinet/checkups/gastro';
import LiverCheckup from './pages/cabinet/checkups/liver';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/">
                <Route index element={<LandingPage />} />
                <Route path="membership" element={<Membership />} />
                <Route path="articles" element={<Articles />} />
                <Route path="resources" element={<Resources />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="/doctor/signup" element={<DoctorSignUp />} />
                <Route path="cabinet/faq" element={<FaqPage />} />
                <Route path="cabinet/appointment" element={<Appointment />} />
                <Route path="cabinet/records" element={<RecordsPage />} />
                <Route path="cabinet/checkups" element={<Checkups />} />
                <Route
                    path="cabinet/checkups/full-checkup"
                    element={<FullCheckup />}
                />
                <Route
                    path="cabinet/checkups/sports-checkup"
                    element={<SportsCheckup />}
                />
                <Route
                    path="cabinet/checkups/pregnancy-checkup"
                    element={<PregnancyCheckup />}
                />
                <Route
                    path="cabinet/checkups/post-surgery-checkup"
                    element={<PostSurgeryCheckup />}
                />
                <Route
                    path="cabinet/checkups/vitamine-d3-checkup"
                    element={<VitamineD3Checkup />}
                />
                <Route
                    path="cabinet/checkups/cardio"
                    element={<CardioCheckup />}
                />
                <Route
                    path="cabinet/checkups/gastro"
                    element={<GastrointestinalCheckup />}
                />
                <Route
                    path="cabinet/checkups/liver"
                    element={<LiverCheckup />}
                />
                <Route path="cabinet/monitoring" element={<Monitoring />} />
                <Route
                    path="cabinet/monitoring/view/:id"
                    element={<ViewCheckup />}
                />
            </Route>
            <Route element={<AuthenticatedRoutes />}>
                <Route path="/cabinet" element={<Cabinet />} />
                <Route path="/doctor/cabinet" element={<DoctorCabinet />} />
                <Route path="/cabinet/settings" element={<SettingsPage />} />
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
