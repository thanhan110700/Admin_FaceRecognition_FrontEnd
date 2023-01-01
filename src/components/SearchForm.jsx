import React, { Children, useState } from 'react'
import { Button } from './Button'
import Input from './Input'

export const SearchForm = ({ onHandleSearch, className, children }) => {
  return (
    <div class={`mb-5 ${className}`}>
      <div class='flex flex-col p-6 rounded-lg shadow-xl hover:shadow-2xl bg-white '>
        <h5 class='text-gray-900 text-xl leading-tight font-medium mb-2'>
          Search Form
        </h5>
        <main>{children}</main>
        <div>
          <Button onClick={onHandleSearch}>Search</Button>
        </div>
      </div>
    </div>
  )
}
