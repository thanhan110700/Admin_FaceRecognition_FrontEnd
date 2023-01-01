import { Button, Stack, Pagination } from '@mui/material'
import { replace } from 'lodash'
import React from 'react'

const CustomPagination = (props) => {
  const { pagination, handleChangePage } = props

  return (
    <div className='flex justify-between p-5'>
      <div>
        <Stack spacing={2}>
          <Pagination
            disabled={!pagination.totalPage}
            count={pagination?.lastPage}
            page={pagination?.currentPage}
            onChange={handleChangePage}
          />
        </Stack>
      </div>
      <div className='flex items-center'></div>
    </div>
  )
}
export default CustomPagination
