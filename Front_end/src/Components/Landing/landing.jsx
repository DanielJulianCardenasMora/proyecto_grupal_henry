import style from './Landing.module.css'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'




function Landing() {



  return (
    <>
    <Nav/>
        <div className={style.main}>
        <div className={style.logo}><h1>WEARFASHION</h1></div>

       <div className={style.image}>
      
       </div>
       <div className={style.description}>
     
  <h1>New Season AW 24 50% off !!</h1>

  <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto qui fugit magnam reprehenderit ut animi nihil nisi sapiente nobis commodi. Suscipit quasi quibusdam fugit cum qui quis accusantium deleniti odit!</p>
<button className={style.learnMore}>Learn more</button>

       </div>


    </div>
    <div className={style.section}>
 <div className={style.card1}>
  <div className={style.imageCard}></div>
  <div className={style.descriptionCard}>
    <h3>Title Card</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam suscipit quaerat numquam facilis cum repellendus ex soluta accusamus quos omnis, distinctio tempora voluptas eos, expedita, quas possimus! Placeat, obcaecati nemo?</p>
    <button className={style.cardButton}>See more</button>
  </div>

 </div>

 <div className={style.banner}>

 </div>
 <div className={style.card2}>
 <div className={style.imageCard2}></div>
  <div className={style.descriptionCard}>    <h3>Title Card</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam suscipit quaerat numquam facilis cum repellendus ex soluta accusamus quos omnis, distinctio tempora voluptas eos, expedita, quas possimus! Placeat, obcaecati nemo?</p>
    <button className={style.cardButton}>See more</button></div>
 </div>

    </div>
<Footer/>
    </>

    


  )
}

export default Landing