export const ORDERS = [
  {
    id: 'ORD-100256',
    type: 'product', // product | subscription
    title: 'Rapunzel Bundle',
    image: 'https://via.placeholder.com/60', // temp image
    status: 'delivered',
    date: '2024-12-15',
    amount: 5999,
    timeline: [
      { label: 'Order Placed', date: '12 Dec, 10:30 AM' },
      { label: 'Confirmed', date: '12 Dec, 12:00 PM' },
      { label: 'Shipped', date: '13 Dec, 09:10 AM' },
      { label: 'Delivered', date: '15 Dec, 06:45 PM' },
    ],
    shipping: {
      name: 'Priya Sharma',
      address: 'House No. 702, Block D, Bhandup East, Mumbai',
      phone: '99999 88888',
    },
    payment: {
      method: 'Cash on Delivery',
      total: 5999,
      discount: 200,
      delivery: 0,
    },
  },
];
