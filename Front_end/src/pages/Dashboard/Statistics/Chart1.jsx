'use client';
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import {sales} from './ordenes'


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { useEffect, useState } from 'react';



const Chart = ({ priceOrder }) => {
  const [newMonthData, setNewMonthData] = useState([]);
  const [orders, setOrders] = useState([]);


  const createData = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const newData = orders.map((order, index) => {
      const monthIndex = index % months.length; // Handle cases with more orders than months
    const monthName = months[monthIndex];
      return {
        name: monthName,
        price: order.total,
      };
    });
    setNewMonthData(newData)
    console.log(newMonthData);
  };

  useEffect(() => {
    setOrders(priceOrder)
    createData()
  }, [priceOrder, orders])
  


  return (
      <div style={{
        color: 'black',
        width: '100%',
        height: '100%',
        fontSize: '1vw',
      }}>
    <ResponsiveContainer width="100%" height="90%" >
        <LineChart
          width={500}
          height={300}
          data={newMonthData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 3" stroke="#7ccfff"/>
          <XAxis dataKey="name" stroke="#ffffff"/>
          <YAxis stroke="#ffffff" />
          <Tooltip />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="price" stroke="#1ed634" activeDot={{ r: 8 }} />
          </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart