import React from 'react'

export default function Input({
  label = '',
  value = '',
  onChange = () => {},
  name = '',
  placeholder = '',
  className = '',
  type = 'text',
  disabled = false,
  required,
}) {
  return (
    <>
      {label && (
        <label
          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
          htmlFor='grid-password'
        >
          {label}
        </label>
      )}
      <input
        className={`${className} appearance-none shadow block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
        type={type}
        value={value}
        name={name}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </>
  )
}
