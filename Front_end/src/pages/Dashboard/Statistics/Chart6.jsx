import React, { useEffect, useState } from 'react'
const places = [
  {
    place: 'a@mail.com',
    amount: 5
  },
  {
    place: 'b@mail.com',
    amount: 4
  },
  {
    place: 'c@mail.com',
    amount: 3
  },
  {
    place: 'd@mail.com',
    amount: 2
  },
  {
    place: 'e@mail.com',
    amount: 1
  },
]


const Chart6 = ({userOrder}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(userOrder)
    
  }, [userOrder, orders])


  return (
    <div style={{width:'80%'}}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{textAlign:'left'}}>Email</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td
                style={{
                color: 'black',
                width: '100%',
                height: '100%',
                textAlign: 'left'
              }}>{order.email}</td>
                <td>{order.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Chart6