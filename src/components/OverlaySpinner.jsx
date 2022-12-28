import React from 'react'
import PropTypes from 'prop-types'

export const OverlaySpinner = ({ open = false }) => (
  <div
    className={`${
      open ? 'z-50 opacity-75' : '-z-50 opacity-0'
    } transition-opacity ease-in-out fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden bg-gray-700 flex flex-col items-center justify-center`}
  >
    <div className='animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-transparent' />
  </div>
)

OverlaySpinner.propTypes = {
  open: PropTypes.bool,
}
