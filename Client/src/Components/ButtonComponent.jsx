import React from 'react'

const ButtonComponent = ({isDisable = false,title='button',onPress}) => {
  return (
    <div course='pointer'>
         <button  disabled={isDisable} onClick={onPress} className='bg-gray-700 px-9 text-white p-2 rounded-lg hover:bg-gray-900 transition-colors duration-300'>
            <h2>{title}</h2>
            
            </button>
         
    </div>
  )
}

export default ButtonComponent
