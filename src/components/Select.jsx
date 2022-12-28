import React from 'react'

export default function Select({
  label = '',
  value = '',
  data = [],
  onChange = () => {},
  name = '',
  id,
  className = '',
  disabled = false,
  required,
}) {
  return (
    <>
      {label && (
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
          {label}
        </label>
      )}
      <div className='relative'>
        <select
          className={`${className} block shadow appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
          id={id}
          value={value}
          name={name}
          onChange={(e) => onChange(e)}
          required={required}
          disabled={disabled}
        >
          {data &&
            data.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
    </>
  )
}
