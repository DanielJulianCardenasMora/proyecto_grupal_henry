import style from './Footer.module.css'





function Footer() {



  return (
 
 <footer className={style.footer} >
  
            <div className={style.ubi}>
                <h3>Ubication</h3>
                <p>
                    CABA - Argentina 
                    
                </p>
            </div>
            <div className={style.list}>
                <h3>Contact us!</h3>
                <ul >
                    <li>
                        <a  target="_blank" href="#" >Facebook</a>
                    </li>
                    <li>
                        <a target="_blank" href="#" >Instagram</a>
                    </li>
                    <li>
                        <a target="_blank" href="#" >Gmail</a>
                    </li>
                    <li>
                        02222-556699
                    </li>

                </ul>
            </div>
  

</footer>

     

  


  )
}

export default Footer