const misOrdenes = [
  // Array 1
  [
    { price: 10, orderId: 1 },
    { price: 15, orderId: 1 },
    { price: 20, orderId: 1 },
  ],
  // Array 2
  [
    { price: 5, orderId: 2 },
    { price: 7, orderId: 2 },
    { price: 12, orderId: 2 },
  ],
  // Array 3
  [
    { price: 3, orderId: 3 },
    { price: 6, orderId: 3 },
    { price: 9, orderId: 3 },
  ],
];




const transformPriceOrder = () => {
  const transformedOrders = [ { id: 1, price: 45 }, { id: 2, price: 24 }, { id: 3, price: 18 } ]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const transformedData = transformedOrders.map((order) => {
    const monthName = months[order.month - 1]; // Get the first three letters of the month name
    return {
      name: monthName,
      price: order.price,
    };
  });

  console.log(transformedData)
};

transformPriceOrder()