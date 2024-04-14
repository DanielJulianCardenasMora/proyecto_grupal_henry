import { useEffect, useState } from 'react'
import style from '../css/Statistics.module.css'
import Chart from './Chart1'
import Chart2 from './Chart2'
import Chart3 from './Chart3'
import Chart4 from './Chart4'
import Chart5 from './Chart5'
import Chart6 from './Chart6'
import axios from 'axios'



const Statistics = () => {
  const URL_ALL_ORDERS = 'https://proyectogrupalhenry-production-e8a4.up.railway.app/admin/orders'
  const URL_EACH_ORDER = 'https://proyectogrupalhenry-production-e8a4.up.railway.app/orders'
  const [allOrders, setAllOrders] = useState([]);
  const [eachOrder, setEachOrder] = useState([]);
  const [pricerOrder, setPriceOrder] = useState([]);



  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${URL_ALL_ORDERS}`);
      const ordersId = data.map((obj, index) => {
        return {
          [`orderid_${index + 1}`]: obj.id,
        };
      });
      setAllOrders(ordersId)
      console.log(allOrders)
    } catch (error) {
      console.error(error);
    }
  };

  const individualOrder = async () => {
    const individualOrders = []
    for (const obj of allOrders) {
      const orderId = obj[`orderid_${Object.keys(obj)[0].slice(-1)}`];
      console.log(orderId)
      const { data } = await axios.get(`${URL_EACH_ORDER}/${orderId}`);
      individualOrders.push(data);
    }
    setEachOrder(individualOrders);
    console.log(eachOrder)
  }

  const sumPrice = () => {
    if (allOrders.length > 0) {
      const results = allOrders.map((order, index) => {
        const orderTotal = eachOrder[index].reduce((sum, obj) => sum + obj.price, 0);
        console.log(order)
        return {
          id: Object.keys(order)[0].slice(-1),
          total: orderTotal,
        };
      });

      let totalSum = 0;

      for (const obj of results) {
        totalSum += obj.total;
      }
    }
    else {
      return
    }
    console.log(results)
  }

  useEffect(() => {
    getOrders();
  }, [])
  useEffect(() => {
    individualOrder();
  }, [allOrders])
  useEffect(() => {
    sumPrice();
  }, [allOrders])






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
          <div>product ranking - top 5 most sold
            <Chart3 />
          </div>
          <div>product ranking - total orders per product
            <Chart4 />
          </div>
        </div>
        <div className={style.seccion4}>
          <div className={style.chart5}>Location sales
            <div className={style.chart5_box}>
              <div className={style.chart5_2}>
                <Chart5 />
              </div>
            </div>
          </div>
          <div className={style.chart6}>Top 5 customers

              <Chart6 />
    
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default Statistics