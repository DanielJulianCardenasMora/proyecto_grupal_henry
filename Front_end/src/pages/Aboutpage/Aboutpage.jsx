import React from "react"
import { CardProfile } from "../../Components"
import background from "../../assets/Imagenes/About_fondoInferior_aplicar.png"
import figuras from "../../assets/Imagenes/About_figuras_aplicar.png"
import style from './about.module.css'
import { Nav } from "../../Components"
import Footer from "../../Components/Footer/Footer"

export const AboutPage = () => {
  return (
    <>
      <div className={style.box}>


        <div className={style.abBg}>

          {/* <img  className={style.figuras} src={figuras}/> */}
          <h2 className={style.workteam}>WORKTEAM</h2>
          <h2 className={style.techtext}>TECHNOLOGIES</h2>
          <div className={style.tecnologias}>
            <h1>Node JS</h1>
            <h1>JavaScript</h1>
            <h1>Express</h1>
            <h1>PostgreSQL</h1>
            <h1>Sequelize</h1>
            <h1>React</h1>
            <h1>Redux</h1>
            <h1>CSS</h1>
          </div>
          <div className={style.container}>
            <CardProfile
              nombre="Alejo Borracci"
              localidad="Argentina"
              linkedin="https://www.linkedin.com/in/alejo-borracci-2323a6199/"
              github="https://github.com/alejoborracci21"
            />
            <CardProfile
              nombre="Kelly Brito Mejia"
              localidad="Republica Dominicana"
              linkedin="https://www.linkedin.com/in/kelly-brito-mejia-1284b6289/"
              github="https://github.com/kebrito"
            />
            <CardProfile
              nombre="Daniel Julian Cardenas"
              localidad="Colombia"
              linkedin="https://www.linkedin.com/in/danieljuliancardenasmora/"
              github="https://github.com/DanielJulianCardenasMora"
            />
            <CardProfile
              nombre="Ludmila Rosa Miranda "
              localidad="Argentina"
              linkedin="https://www.linkedin.com/in/ludmila-rosa-miranda/"
              github="https://github.com/Foggynoti0n"
            />
            <CardProfile
              nombre="Luciano Gallinger"
              localidad="Argentina"
              linkedin="https://www.linkedin.com/in/luciano-gallinger-954a09183/"
              github="https://github.com/LucianoGLR"
            />
            <CardProfile
              nombre="Kevin Jeremias Barrios"
              localidad="Argentina"
              linkedin=" https://www.linkedin.com/in/kevinjbarrios/"
              github="https://github.com/Jerebrrs"
            />

          </div>
          <div className={style.background}>
            <div className={style.runner}></div>
            <div className={style.desc}>

              <h1>THE SCIENCE BEHIND WEARFASHION</h1>

              <p >The WEARFASHION company is a brand that emerged after noticing the market demand for greater availability of urban clothing for young people, focusing mainly on the combination of current design trends.</p>
              <p>The objective of this project is to ensure that our clients are satisfied with our work and that the image of our brand inspires confidence, aiming to develop improvements and cover needs that may arise along the way.</p>


            </div>
          </div>

        </div>
  
      </div>
    </>
  );
}
