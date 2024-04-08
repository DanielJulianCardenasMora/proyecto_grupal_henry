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
  <p>This is the online store of the WEARFASHION brand. Our goal is to expand the scope of urban clothing design.</p>
  <p>We invite you to explore our online catalog and discover the latest men's and women's fashion that suits your unique style.</p>
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
    <h3>Original design</h3>
    <p>Ditch the derivative and embrace the distinctive. Our clothing isn't churned out by factories chasing trends. Each piece is an original design, meticulously crafted to flatter your form and reflect your unique style. You won't find these looks anywhere else – so go ahead, stand out from the crowd in confidence.</p>
    <Link to='/products'><button className={style.cardButton}>See more</button></Link>
  </div>

 </div>
 <div className={style.card2}>
 <div className={style.imageCard2}></div>
  <div className={style.descriptionCard}>    <h3>Urban culture</h3>
    <p>
Craving clothes that capture the city's energy? Look no further. Our threads are designed for the urban jungle, blending comfort and edge for the nonstop life.  We focus on street-inspired style that's perfect for navigating the city sidewalks in confidence.  It's fashion with a pulse, made for those who rep the urban vibe.</p>
    <Link to='/products'><button className={style.cardButton}>See more</button></Link>
    </div>
 </div>
</div>

    </div>
<Footer/>
    </>

    


  )
}

