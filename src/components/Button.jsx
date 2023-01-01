import React from 'react'

export const Button = ({
  type = 'button',
  onClick,
  className = '',
  children,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} inline-block float-right px-10 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
