import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    pv: 2200,
  },
  {
    name: 'Feb',
    pv: 400,
  },
  {
    name: 'Mar',
    pv: 400,
  },
  {
    name: 'Apr',
    pv: 400,
  },
  {
    name: 'May',
    pv: 400,
  },
  {
    name: 'Jun',
    pv: 400,
  },
  {
    name: 'Jul',
    pv: 400,
  },
  {
    name: 'Aug',
    pv: 400,
  },
  {
    name: 'Sep',
    pv: 400,
  },
  {
    name: 'Oct',
    pv: 400,
  },
  {
    name: 'Nov',
    pv: 400,
  },
  {
    name: 'Dec',
    pv: 400,
  },


];

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
        {value[0]}
      </text>
    </g>
  );
};



const Chart2 = ({ eachOrder }) => {

  const [newMonthData, setNewMonthData] = useState([]);
  const [orders, setOrders] = useState([]);


  // const createData = () => {
  //   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //   const newData = orders.map((order, index) => {
  //     const monthIndex = index % months.length; // Handle cases with more orders than months
  //   const monthName = months[monthIndex];
  //     return {
  //       name: monthName,
  //       price: order.total,
  //     };
  //   });
  //   setNewMonthData(newData)
  //   console.log(newMonthData);
  // };

  useEffect(() => {
    setOrders(eachOrder)
    console.log(orders)
    // createData()
  }, [eachOrder, orders])







  return (
    <div style={{
      color: 'black',
      width: '100%',
      height: '100%',
      fontSize: '1vw',
    }}>
 <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: -8,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 3" stroke="#7ccfff" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="pv" fill="#7cffb3" minPointSize={5}>
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
  )
}

export default Chart2