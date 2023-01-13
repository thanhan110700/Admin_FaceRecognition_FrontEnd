import React, { memo } from 'react'

const DescriptionCard = ({
  className = '',
  title,
  value,
  onClick = () => {},
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-5 pt-4 pb-8 rounded-xs shadow-lg font-bold hover:shadow-xl flex flex-col gap-4 justify-between items-center ${className}`}
    >
      <div>{title}</div>
      <div className='text-3xl'>{value}</div>
    </div>
  )
}

export default memo(DescriptionCard)
