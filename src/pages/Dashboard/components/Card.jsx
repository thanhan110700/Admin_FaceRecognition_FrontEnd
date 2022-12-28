import React, { memo } from 'react'

const Card = ({ className = '', children, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className={`px-[100px] py-10 rounded-xl shadow-lg font-bold hover:shadow-xl flex  justify-center items-center ${className}`}
    >
      {children}
    </div>
  )
}

export default memo(Card)
