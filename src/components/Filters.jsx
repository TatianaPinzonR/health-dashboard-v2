import React from "react";
import Select from "react-select";
import "../components/graficos.css";

const Filters = ({
                     data,
                     selectedCountries,
                     setSelectedCountries,
                     selectedDiseases,
                     setSelectedDiseases,
                     selectedYears,
                     setSelectedYears,
                     selectedGenders,
                     setSelectedGenders,
                 }) => {
    const getUniqueOptions = (key) => {
        const values = Array.from(new Set(data.map((item) => item[key]).filter((v) => v != null)));
        return values.map((val) => ({ value: val, label: val }));
    };

    return (
        <div className="filters-container">
            <Select
                isMulti
                options={getUniqueOptions("Country")}
                value={selectedCountries.map((v) => ({ value: v, label: v }))}
                onChange={(selected) => setSelectedCountries(selected.map((s) => s.value))}
                className="select"
                placeholder="Seleccionar países (máx. 4)"
                closeMenuOnSelect={false}
                isOptionDisabled={() => selectedCountries.length >= 4}
            />
            <Select
                isMulti
                options={getUniqueOptions("Disease Name")}
                value={selectedDiseases.map((v) => ({ value: v, label: v }))}
                onChange={(selected) => setSelectedDiseases(selected.map((s) => s.value))}
                className="select"
                placeholder="Seleccionar enfermedades (máx. 4)"
                closeMenuOnSelect={false}
                isOptionDisabled={() => selectedDiseases.length >= 4}
            />
            <Select
                isMulti
                options={getUniqueOptions("Year")}
                value={selectedYears.map((v) => ({ value: v, label: v }))}
                onChange={(selected) => setSelectedYears(selected.map((s) => s.value))}
                className="select"
                placeholder="Seleccionar años (máx. 4)"
                closeMenuOnSelect={false}
                isOptionDisabled={() => selectedYears.length >= 4}
            />
            <Select
                isMulti
                options={getUniqueOptions("Gender")}
                value={selectedGenders.map((v) => ({ value: v, label: v }))}
                onChange={(selected) => setSelectedGenders(selected.map((s) => s.value))}
                className="select"
                placeholder="Seleccionar géneros (máx. 4)"
                closeMenuOnSelect={false}
                isOptionDisabled={() => selectedGenders.length >= 4}
            />
        </div>
    );
};

export default Filters;
