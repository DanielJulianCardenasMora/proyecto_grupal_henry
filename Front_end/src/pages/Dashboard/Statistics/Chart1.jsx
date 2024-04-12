'use client';
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import {sales} from './ordenes'

const product = [
  {
    name: 'Jan',
    product1: 2000,
    product2: 4000,
  },
  {
    name: 'Feb',
    product1: 3000,
    product2: 5000,
  },
  {
    name: 'Mar',
    product1: 1000,
    product2: 2000,
  },
  {
    name: 'Apr',
    product1: 2000,
    product2: 3000,
  },
]

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
  {
    name: 'Page A',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    pv: 4300,
    amt: 2100,
  },
];


const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height="90%">
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
  )
}

export default Chart