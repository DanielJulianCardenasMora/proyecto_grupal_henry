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
  const [priceOrder, setPriceOrder] = useState([]);
  const [totalSum, setTotalSum] = useState([]);
  

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${URL_ALL_ORDERS}`);
      const ordersId = data.map((obj, index) => {
        return {
          [`orderid_${index + 1}`]: obj.id
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
      const { data } = await axios.get(`${URL_EACH_ORDER}/${orderId}`);
      if (data) {
        individualOrders.push(data);
      }
    }
    setEachOrder(individualOrders);
  }
  
  const sumPrice = () => {
    const results = eachOrder.map((order, index) => {
      if (order.length === 0) {
        return  // Skip this iteration and return null
      }
      const orderId = order[0].OrderId
      let totalPrice = 0;
      order.forEach(item => {
        if (item.price !== undefined) {
          totalPrice += item.price * item.quantity;
        }
      });
      return {
        id: orderId,
        total: totalPrice,
      };

    });

    setPriceOrder(results)
    let totalSum = 0;
    for (const obj of results) {
      totalSum += obj.total;
    }
    setTotalSum(totalSum)
  }

  const getQuantity = () => {
    const uniqueOrders = [];
    for (const order of eachOrder) {
      for (const obj of order) {
        const existingOrder = uniqueOrders.find((item) => item.name === obj.name);
        if (existingOrder) {
          existingOrder.quantity += obj.quantity;
        } else {
          uniqueOrders.push({ name: obj.name, quantity: obj.quantity });
        }
      }
    }
    console.log(uniqueOrders);
  }

  useEffect(() => {
    getOrders();
  }, [])
  useEffect(() => {
    individualOrder();
  }, [allOrders, totalSum])
  useEffect(() => {
    sumPrice();
    getQuantity()
  }, [eachOrder])

  // // Solo para comprobar
  useEffect(() => {
    console.log(allOrders)
    console.log(eachOrder)
    console.log(priceOrder)
    console.log(totalSum)
  }, [allOrders])

  
  return (
    <div className={style.main} >
      <div className={style.titlebox}>
        <h1 className={style.title}>Statistics</h1>
        <h1 className={style.title}>Performance</h1>
        <h1 className={style.title}>Incomes</h1>
        <h1 className={style.title}>Results</h1>
      </div>

      <div className={style.scrollseccion}>
        <div className={style.seccion1}>
          <div>Total sales income
            <h1>{`$${totalSum}`}</h1>
          </div>
          <div>Earnings 40% basis
            <h1>{`$${Math.floor(0.4 * totalSum)}`}</h1>
          </div>
          <div>Total orders
            <h1>{allOrders.length}</h1>
          </div>
        </div>
   

        <div className={style.seccion2}>
          <div className={style.area}>Sales per month
            <Chart priceOrder={priceOrder} />
          </div>
          <div className={style.area}>Orders per month
            <Chart2 priceOrder={priceOrder}/>
          </div>
        </div>
        <div className={style.seccion3}>
          <div className={style.product}>Product ranking --- Top 5 most sold
            <Chart3 />
          </div>
          <div className={style.product}>Product ranking --- Total orders per product
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