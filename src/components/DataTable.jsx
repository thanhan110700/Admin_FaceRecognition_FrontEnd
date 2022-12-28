import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

function NoRowsOverlay() {
  return <p className='py-7 text-center'>No data</p>
}

export default function DataTable({ ...props }) {
  return (
    <Box className='data-table'>
      <DataGrid
        rowHeight={40}
        sortingOrder={['desc', 'asc']}
        autoHeight
        disableColumnMenu
        hideFooterSelectedRowCount
        sortingMode='server'
        hideFooter
        components={{
          NoRowsOverlay,
        }}
        {...props}
      />
    </Box>
  )
}
