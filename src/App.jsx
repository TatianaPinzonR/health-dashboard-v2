// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Registros from './pages/Registros';
import Graficos from './pages/Graficos';
import Login from "./pages/Login";

export default function App() {
    const renderLayout = (component) => (
        <div className="container-scroller">
            <Sidebar />
            <div className="container-fluid page-body-wrapper">
                {component}
            </div>
        </div>
    );

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={renderLayout(<Dashboard />)} />
            <Route path="/registros" element={renderLayout(<Registros />)} />
            <Route path="/graficos" element={renderLayout(<Graficos />)} />
        </Routes>
    );
}
