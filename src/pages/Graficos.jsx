import React, { useState, useEffect } from "react";
import axios from "axios";
import Filters from "../components/Filters";
import StatsCards2 from "../components/StatsCards2";
import Charts2 from "../components/Charts2";
import "../components/graficos.css";

const Graficos = () => {
    const [data, setData] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/data")
            .then((res) => setData(res.data))
            .catch((err) => console.error("Error al obtener datos:", err));
    }, []);

    return (
        <div className="graficos-container">
            <Filters
                data={data}
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
                selectedDiseases={selectedDiseases}
                setSelectedDiseases={setSelectedDiseases}
                selectedYears={selectedYears}
                setSelectedYears={setSelectedYears}
                selectedGenders={selectedGenders}
                setSelectedGenders={setSelectedGenders}
            />
            <StatsCards2
                data={data}
                selectedCountries={selectedCountries}
                selectedDiseases={selectedDiseases}
                selectedYears={selectedYears}
                selectedGenders={selectedGenders}
            />
            <Charts2
                data={data}
                selectedCountries={selectedCountries}
                selectedDiseases={selectedDiseases}
                selectedYears={selectedYears}
                selectedGenders={selectedGenders}
            />
        </div>
    );
};

export default Graficos;
