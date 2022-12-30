import { Dialog, Transition } from '@headlessui/react'
import PropTypes from 'prop-types'
import React, { Fragment, useRef } from 'react'

export default function Modal({ isOpen, setIsOpen, children }) {
  const closeModal = () => {
    setIsOpen(false)
  }
  const cancelButtonRef = useRef(null)
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        initialFocus={cancelButtonRef}
        className='relative z-10'
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto' ref={cancelButtonRef}>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden p-6 text-left align-middle transition-all'>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func,
  children: PropTypes.element.isRequired,
}
