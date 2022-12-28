import React from 'react'
import BarChart from '../../charts/BarChart01'

// Import utilities
import { tailwindConfig } from '../../utils/Utils'

function DashboardCard04() {
  const date = new Date()

  const chartData = {
    labels: [
      date.toLocaleDateString(),
      date.toLocaleDateString(),
      date.toLocaleDateString(),
      date.toLocaleDateString(),
      date.toLocaleDateString(),
      date.toLocaleDateString(),
    ],
    datasets: [
      // Light blue bars

      // Blue bars
      {
        label: 'Indirect',
        data: [4900, 2600, 5350, 4800, 5200, 4800],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  }

  return (
    <div className='flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200'>
      <header className='px-5 py-4 border-b border-slate-100'>
        <h2 className='font-semibold text-slate-800'>Direct VS Indirect</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  )
}

export default DashboardCard04
