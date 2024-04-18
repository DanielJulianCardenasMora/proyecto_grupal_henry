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
  const URL_USERS = 'https://proyectogrupalhenry-production-e8a4.up.railway.app/admin/users-list'
  const [allOrders, setAllOrders] = useState([]);
  const [eachOrder, setEachOrder] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [priceOrder, setPriceOrder] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [userCountry, setUserCountry] = useState([]);
  const [totalSum, setTotalSum] = useState([]);


  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${URL_ALL_ORDERS}`);
      const ordersId = data.map((obj, index) => {
        return {
          idOrder: obj.id
        };
      });
      setAllOrders(ordersId)
    } catch (error) {
      console.error(error);
    }
  };



  const individualOrder = async () => {
    const individualOrders = []
    for (const obj of allOrders) {

      const orderId = obj.idOrder;
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
    setProductQuantity(uniqueOrders)
      ;
  }

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${URL_USERS}`);
      const userOrders = data.map((user) => {
        return {
          email: user.email,
          orders: user.Orders.length,
        };
      });
      const userCountry = data.reduce((acc, user) => {
        const country = user.country;
        const existingEntry = acc.find((entry) => entry.place === country);

        if (existingEntry) {
          existingEntry.orders += user.Orders.length; // Add order count to existing entry
        } else {
          acc.push({ place: country, orders: user.Orders.length }); // Create new entry for unique country
        }

        return acc;
      }, []);

      setUserOrder(userOrders)
      setUserCountry(userCountry)


    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getOrders();
    getUsers()
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
    console.log(userOrder)
  }, [totalSum])


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

          <div className={style.area}>{'Sales per month (first 12 orders)'}
            <Chart priceOrder={priceOrder} />

          </div>
          <div className={style.area}>Product ranking --- Top 5 most sold
            {/* <Chart2 priceOrder={priceOrder} /> */}
            <Chart3 productQuantity={productQuantity} />
          </div>
        </div>
        <div className={style.seccion3}>
          {/* <div className={style.product}>Product ranking --- Top 5 most sold
       
      </div> */}
          <div className={style.product}>Product ranking --- Total units sold per all products
        <Chart4 productQuantity={productQuantity} />
          </div>
        </div>
        <div className={style.seccion4}>
          <div className={style.chart5}>Location sales
            <div className={style.chart5_box}>
              <div className={style.chart5_2}>
                <Chart5 userCountry={userCountry} />
              </div>
            </div>
          </div>
          <div className={style.chart6}>Top 5 customers

            <Chart6 userOrder={userOrder} />

          </div>
        </div>
      </div>

    </div>
  )
}

export default Statistics