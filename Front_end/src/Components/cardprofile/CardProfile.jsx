import React from "react";
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Importa íconos de redes sociales
import './cardprofile.css'

const CardProfile = ({nombre, localidad, linkedin, github}) => {
    return (
        <div className="card-container">
            <div className="card-header">
                <h3>{nombre}</h3>
                <h5>{localidad}</h5>
            </div>
            <div className="card-social">
                <div className="social-icons">
                    <a href={linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    <a href={github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                </div>
            </div>
        </div>
    )
}

export default CardProfile;
