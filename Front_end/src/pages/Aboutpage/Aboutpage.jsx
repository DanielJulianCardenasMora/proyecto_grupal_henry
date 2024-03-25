import React from "react"
import {CardProfile} from "../../Components"
import background from "../../assets/Imagenes/About_fondoInferior_aplicar.png"
import figuras from "../../assets/Imagenes/About_figuras_aplicar.png"
import style from './about.module.css'

export const AboutPage = () => {
  return (
    <>
              <img className={style.figuras} src={figuras} />
      <div className={style.box}>
        <h3 className={style.workteam}>Workteam</h3>
        <div className={style.container}>
          <CardProfile
            nombre="Alejo Borracci"
            localidad="Rosario, Santa Fe, Argentina"
            linkedin="https://www.linkedin.com/in/alejo-borracci-2323a6199/"
            github="https://github.com/alejoborracci21"
          />
          <CardProfile
            nombre="Kelly Brito Mejia"
            localidad="Rosario, Santa Fe, Argentina"
            linkedin="https://www.linkedin.com/in/kelly-brito-mejia-1284b6289/"
            github="https://github.com/kebrito"
          />
          <CardProfile
            nombre="Daniel Cardenas Mora"
            localidad="Rosario, Santa Fe, Argentina"
            linkedin="https://www.linkedin.com/in/danieljuliancardenasmora/"
            github="https://github.com/DanielJulianCardenasMora"
          />
          <CardProfile
            nombre="Ludmila Rosa Miranda "
            localidad="Rosario, Santa Fe, Argentina"
            linkedin="https://www.linkedin.com/ludmila-rosa-miranda"
            github="https://github.com/Foggynoti0n"
          />
          <CardProfile
            nombre="Luciano Gallinger"
            localidad="Rosario, Santa Fe, Argentina"
            linkedin="https://www.linkedin.com/in/luciano-gallinger-954a09183/"
            github="https://github.com/LucianoGLR"
          />
          <CardProfile
            nombre="Alejandro Serrano Herrera"
            localidad="Rosario, Santa Fe, Argentina"
            linkedin="https://www.linkedin.com/in/serranoh93/"
            github="https://github.com/SerranoH93"
          />
          <CardProfile
            nombre="Kevin Jeremias Barrios"
            localidad="Rosario, Santa Fe, Argentina"
            linkedin=" https://www.linkedin.com/in/kevinjbarrios/"
            github="https://github.com/Jerebrrs"
          />
          <CardProfile
            nombre="Shirley Balbuena"
            localidad="Rosario, Santa Fe, Argentina"
            linkedin="https://www.linkedin.com/in/shirley-balbuena-0b5bab295/"
            github=" https://github.com/ShirleyBal"
          />

        </div>
        <img src={background} className={style.background} />
      </div>

    </>
  );
};
