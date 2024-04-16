import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },

];


const Chart3 = ({ productQuantity }) => {
  const [top, setTop] = useState([]);
  const [orders, setOrders] = useState([]);

  const getTop = () => {
    const top5Items = orders
    .sort((a, b) => b.quantity - a.quantity) // Sort in descending order based on quantity
      .slice(0, 5); // Get the first 5 items
    setTop(top5Items)
    console.log(top)
  }

  useEffect(() => {
    setOrders(productQuantity)
    getTop()
  }, [productQuantity, orders])
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#2ce263'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        {` ${top[index].name}`}
      </text>
      
    );
  };

  return (
    <div style={{
      color: 'black',
      width: '100%',
      height: '100%',
      fontSize: '1vw',
    }}>
    <ResponsiveContainer width="100%" height="100%">
    <PieChart width={400} height={400}>
      <Pie
        data={top}
        cx="50%"
        cy="45%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
        dataKey={"quantity"}
      >
        {top.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart3