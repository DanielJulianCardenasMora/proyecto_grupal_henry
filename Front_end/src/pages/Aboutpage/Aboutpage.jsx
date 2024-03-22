import React from "react"
import CardProfile from "../../Components/Cardprofile/CardProfile"
import background from "../../assets/Imagenes/About_fondoInferior_aplicar.png"
import figuras from "../../assets/Imagenes/About_figuras_aplicar.png"
import style from './about.module.css'
import { Nav } from "../../Components"
import Footer from "../../Components/Footer/Footer"

export const AboutPage = () => {
    return (
      <>
      
  <div className={style.abBg}>
  <div className={style.background}>
         <div className={style.runner}></div>
         <div className={style.desc}>
     
     <h1>THE SCIENCE BEHIND WEARFASHION</h1>
   
     <p >La empresa WEARFASHION es una marca que surge al notar la demanda del mercado   por una mayor disponibilidad  de   ropa   urbana   para   jóvenes,   enfocándose principalmente en la combinación de tendencias del diseño actual.</p>
   <p>El objetivo de este proyecto es hacer que nuestros clientes estén satisfechos con nuestro trabajo y que la imagen de nuestra marca inspire confianza, apuntando a desarrollar mejoras y cubrir necesidades que puedan surgir en el camino .</p>
   <button className={style.learnMore}>Learn more</button>
   
          </div>
         </div>
        {/* <img  className={style.figuras} src={figuras}/> */}
        <h2 className={style.workteam}>WORKTEAM</h2>
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
            nombre="Daniel Julian Cardenas Mora"
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

        </div>
        <Footer/>
      </>
    );
}
