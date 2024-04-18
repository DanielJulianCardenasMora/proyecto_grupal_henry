import React from "react";
import { CardProfile } from "../../Components";
import Footer from "../../Components/Footer/Footer";
import image from "../../assets/Imagenes/alejo3.png";

import reactIcon from "../../assets/icons/react.svg";
import cssIcon from "../../assets/icons/css3.svg";
import javascriptIcon from "../../assets/icons/javascript.svg";
import nodeIcon from "../../assets/icons/nodedotjs.svg";
import postgresIcon from "../../assets/icons/postgresql.svg";
import reduxIcon from "../../assets/icons/redux.svg";
import sequelizeIcon from "../../assets/icons/sequelize.svg";
import expressIcon from "../../assets/icons/express.svg";

import style from "./about.module.css";

export const AboutPage = () => {
  return (
    <>
      <div className={style.box}>
        <div className={style.abBg}>
          <div className={style.title}>
<<<<<<< HEAD
            <h3 className={style.workteam}>📚 WORKTEAM</h3>
=======
            <h3 className={style.workteam}>WORKTEAM</h3>
            <h3 className={style.techtext}>⚙️ TECHNOLOGIES</h3>

>>>>>>> 1461c4193f936de68e75dc06acd42b54984c92cb
          </div>
          <div className={style.containerbox}>
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
            <div className={style.tecnologiasContainer}>
              <div className={style.tecnologiasLine}>
                <img className={style.icons} src={nodeIcon} alt="Node.js" />
                <img
                  className={style.icons}
                  src={javascriptIcon}
                  alt="JavaScript"
                />
                <img className={style.icons} src={expressIcon} alt="Express" />
              </div>
              <div className={style.tecnologiasLine}>
                <img className={style.icons} src={reactIcon} alt="React" />
                <img className={style.icons} src={cssIcon} alt="CSS" />
                <img
                  className={style.icons}
                  src={sequelizeIcon}
                  alt="Sequelize"
                />
              </div>
              <div className={style.tecnologiasLine}>
                <img className={style.icons} src={reduxIcon} alt="Redux" />
                <img
                  className={style.icons}
                  src={postgresIcon}
                  alt="PostgreSQL"
                />
              </div>
            </div>
          </div>
          <div className={style.background}>
            <div className={style.desc}>
              <h1>THE SCIENCE BEHIND WEARFASHION</h1>
              <p>
                The WEARFASHION company is a brand that emerged after noticing
                the market demand for greater availability of urban clothing for
                young people, focusing mainly on the combination of current
                design trends.
              </p>
              <p>
                The objective of this project is to ensure that our clients are
                satisfied with our work and that the image of our brand inspires
                confidence, aiming to develop improvements and cover needs that
                may arise along the way.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </>
  );
};
