// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Registros from './pages/Registros';
import Graficos from './pages/Graficos';
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useUser } from "./context/UserContext";

export default function App() {
    const { user } = useUser();

    return (
        <div className="container-scroller">
            {user && <Sidebar />}

            <div className="container-fluid page-body-wrapper">
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/registros"
                        element={
                            <PrivateRoute>
                                <Registros />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/graficos"
                        element={
                            <PrivateRoute>
                                <Graficos />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}
