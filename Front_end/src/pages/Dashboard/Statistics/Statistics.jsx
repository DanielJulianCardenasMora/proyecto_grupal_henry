import style from '../css/Statistics.module.css'
import Chart from './Chart1'
import Chart2 from './Chart2'

const Statistics = () => {
  return (
    <div className={style.main}>
      <div className={style.titlebox}>
        <h1 className={style.title}>Statistics</h1>
        <h1 className={style.title}>Performance</h1>
        <h1 className={style.title}>Incomes</h1>
        <h1 className={style.title}>Results</h1>
      </div>

      <div className={style.scrollseccion}>
        <div className={style.seccion1}>
          <div>Total sales income</div>
          <div>Earnings 40% basis</div>
          <div>Total orders</div>
        </div>
   

        <div className={style.seccion2}>
          <div className={style.area}>Sales per month
            <Chart />
          </div>
          <div className={style.area}>Orders per month
            <Chart2 />
          </div>
        </div>
        <div className={style.seccion3}>
          <div>product ranking - top 5 most saled</div>
          <div>product ranking - total orders per product</div>
        </div>
        <div className={style.seccion4}>
          <div>Location sales</div>
          <div>Top 5 customers</div>
        </div>
      </div>
    
    </div>
  )
}

export default Statistics