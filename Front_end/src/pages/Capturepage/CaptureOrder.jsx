import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export const CaptureOrder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const payerID = searchParams.get("PayerID");
    const [payed, setPayed] = useState(null);
    const [countdown, setCountdown] = useState(5); // Iniciar el contador en 5 segundos

    const getOrder = async () => {
        try {
            const response = await axios.get(`https://proyectogrupalhenry-production-e8a4.up.railway.app/capture-order?token=${token}&PayerID=${payerID}`);
            ;
            setPayed(response.data);
        } catch (error) {
            ;
        }
    };

    useEffect(() => {
        getOrder();
    }, [token, payerID]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            } else {
               navigate("/");
            }
        }, 1000); // Actualizar cada segundo

        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
    }, [countdown, history]);

    return (
        <div>
            <br /><br /><br /><br />
            <h1>Status: {payed}</h1>
            <h2>Redirecting in {countdown} seconds...</h2>
        </div>
    );
};
