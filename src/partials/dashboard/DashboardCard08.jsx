import React from 'react'
import LineChart from '../../charts/LineChart02'

// Import utilities
import { tailwindConfig } from '../../utils/Utils'

function DashboardCard08({ data = [] }) {
  console.log(data)
  let total = data.map(({ total }) => total)
  let date = data.map(({ date }) => date)
  console.log(total)
  const chartData = {
    labels: date,
    datasets: [
      // Blue line
      {
        label: 'Previous',
        data: total,
        borderColor: tailwindConfig().theme.colors.blue[400],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[400],
      },
    ],
  }

  return (
    <div className='flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200'>
      <header className='px-5 py-4 border-b border-slate-100 flex items-center'>
        <h2 className='font-semibold text-slate-800'>
          Sales Over Time (all stores)
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartData} width={595} height={248} />
    </div>
  )
}

export default DashboardCard08
