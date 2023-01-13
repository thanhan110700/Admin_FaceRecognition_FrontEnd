import React, { useRef, useEffect } from 'react'

import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-moment'

// Import utilities
import { tailwindConfig, formatValue } from '../utils/Utils'

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
)

function LineChart02({ data, width, height }) {
  const canvas = useRef(null)
  const legend = useRef(null)

  useEffect(() => {
    const ctx = canvas.current
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              beginAtZero: true,
            },
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => formatValue(value),
            },
          },
          x: {
            type: 'time',
            time: {
              parser: 'MM-DD-YYYY',
              unit: 'month',
              displayFormats: {
                month: 'MMM YY',
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => formatValue(context.parsed.y),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    })
    return () => chart.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <div className='grow'>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  )
}

export default LineChart02
