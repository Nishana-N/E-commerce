import React, { useState } from 'react'

const Categoryform = ({handleSubmit,value,setValue }) => {
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <input
                type='text'
                className='form-control'
                id='exampleInputEmail'
                aria-describedby='emailhelp'
                placeholder='Enter new category'
                value={value}
                onChange={(e) =>setValue(e.target.value) }
                />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}

export default Categoryform