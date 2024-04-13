import React from 'react'
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


const Chart6 = () => {
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
            {places.map((place, index) => (
              <tr key={index}>
                <td
                style={{
                color: 'black',
                width: '100%',
                height: '100%',
                textAlign: 'left'
              }}>{place.place}</td>
                <td>{place.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Chart6