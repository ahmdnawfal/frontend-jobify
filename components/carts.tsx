'use client';

import React from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Legend,
  Bar,
  Rectangle,
} from 'recharts';

const Carts = () => {
  const data = [
    {
      name: 'Jan',
      Job: 4000,
      User: 2400,
    },
    {
      name: 'Feb',
      Job: 3000,
      User: 1398,
    },
    {
      name: 'Mar',
      Job: 2000,
      User: 9800,
    },
    {
      name: 'Apr',
      Job: 2780,
      User: 3908,
    },
    {
      name: 'May',
      Job: 1890,
      User: 4800,
    },
    {
      name: 'June',
      Job: 2390,
      User: 3800,
    },
    {
      name: 'July',
      Job: 3490,
      User: 4300,
    },
    {
      name: 'Aug',
      Job: 2300,
      User: 1234,
    },
    {
      name: 'Sep',
      Job: 5833,
      User: 3400,
    },
    {
      name: 'Oct',
      Job: 6000,
      User: 3500,
    },
    {
      name: 'Nov',
      Job: 6500,
      User: 4000,
    },
    {
      name: 'Dec',
      Job: 8000,
      User: 6000,
    },
  ];

  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey='User'
          fill='#8884d8'
          activeBar={<Rectangle fill='pink' stroke='blue' />}
        />
        <Bar
          dataKey='Job'
          fill='#82ca9d'
          activeBar={<Rectangle fill='gold' stroke='purple' />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Carts;
