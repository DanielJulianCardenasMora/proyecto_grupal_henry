import React, { useEffect, useState } from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
  
const Chart4 = ({productQuantity}) => {
  const [top, setTop] = useState([]);
  const [orders, setOrders] = useState([]);

  const getTop = () => {
    const items = orders
    .sort((a, b) => b.quantity - a.quantity) // Sort in descending order based on quantity
    setTop(items)
    
  }

  useEffect(() => {
    setOrders(productQuantity)
    getTop()
  }, [productQuantity, orders])


  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
  
    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8b2ff3" />
        <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
          {value.split(' ')[1]}
        </text>
      </g>
    );
  };





  return (

    // <ResponsiveContainer width="100%" height="100%">
    // <BarChart
    //   width={500}
    //   height={300}
    //   data={top}
    //   margin={{
    //     top: 5,
    //     right: 30,
    //     left: 20,
    //     bottom: 5,
    //   }}
    //   barSize={20}
    // >
    //   <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} stroke="#ffffff" />
    //   <YAxis stroke="#ffffff"/>
    //   <Tooltip />
    //   <Legend />
    //   <CartesianGrid strokeDasharray="2 3" stroke="#7ccfff"/>
    //   <Bar dataKey="quantity" fill="#8884d8" background={{ fill: '#eee' }} />
    // </BarChart>
    //   </ResponsiveContainer>

    <div style={{
      color: 'black',
      width: '100%',
      height: '100%',
      fontSize: '.5vw',
    }}>
<ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={top}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 3" />
          <XAxis dataKey="name" stroke="#ffffff"/>
          <YAxis stroke="#ffffff"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#da55f5" minPointSize={5}>
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
          {/* <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} /> */}
        </BarChart>
      </ResponsiveContainer>
        </div>
    
  )
}

export default Chart4