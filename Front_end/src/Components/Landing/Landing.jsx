import style from './Landing.module.css'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import SearchBar from '../SearchBar/SearchBar'
import { Link } from 'react-router-dom'




export const Landing=()=> {



  return (
    <>
   
        <div className={style.main}>
        <div className={style.logo}><h1>WEARFASHION</h1></div>

       <div className={style.image}>
      
       </div>
       <div className={style.description}>
     
  <h1>New Season AW 24 50% off !!</h1>
  <p>Esta es la tienda online de la marca WEARFASHION. Nuestro objetivo es extender el alcance del diseño de indumentaria urbana.</p>
  <p >Te invitamos a explorar nuestro catálogo en línea y descubrir la última moda masculina y femenina que se adapte a tu estilo único. </p>
<Link to='/about'><button className={style.learnMore}>Learn more</button></Link>

       </div>


    </div>
    <div className={style.section}>


 <div className={style.banner}>

 </div>

<div className={style.landingCards}>
<div className={style.card1}>
  <div className={style.imageCard}></div>
  <div className={style.descriptionCard}>
    <h3>Title Card</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam suscipit quaerat numquam facilis cum repellendus ex soluta accusamus quos omnis, distinctio tempora voluptas eos, expedita, quas possimus! Placeat, obcaecati nemo?</p>
    <Link to='/products'><button className={style.cardButton}>See more</button></Link>
  </div>

 </div>
 <div className={style.card2}>
 <div className={style.imageCard2}></div>
  <div className={style.descriptionCard}>    <h3>Title Card</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam suscipit quaerat numquam facilis cum repellendus ex soluta accusamus quos omnis, distinctio tempora voluptas eos, expedita, quas possimus! Placeat, obcaecati nemo?</p>
    <Link to='/products'><button className={style.cardButton}>See more</button></Link>
    </div>
 </div>
</div>

    </div>
<Footer/>
    </>

    


  )
}

