import { useEffect, useState } from 'react';
import axios from 'axios';

export const useHealthData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/data')
            .then(res => {
                setData(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('❌ Error al cargar datos:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
};
