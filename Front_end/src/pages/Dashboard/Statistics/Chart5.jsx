import React, { useEffect, useState } from 'react'

const places = [
  {
    place: 'Argentina',
    amount: 5
  },
  {
    place: 'Republica Dominicana',
    amount: 4
  },
  {
    place: 'Colombia',
    amount: 3
  },
  {
    place: 'Chile',
    amount: 2
  },
  {
    place: 'United States',
    amount: 1
  },
  {
    place: 'Mexico',
    amount: 3
  },
  {
    place: 'Ecuador',
    amount: 2
  },
]


const Chart5 = ({ userCountry }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(userCountry)
    
  }, [userCountry, orders])

  
  return (
    <div style={{width:'90%'}}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{textAlign:'left'}}>Place</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((place, index) => (
            <tr key={index}>
              <td
               style={{
                color: 'black',
                width: '100%',
                height: '100%',
                textAlign: 'left'
              }}>{place.place}</td>
              <td>{place.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Chart5