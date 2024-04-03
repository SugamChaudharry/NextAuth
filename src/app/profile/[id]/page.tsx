import React from 'react'

export default function page({params}: any) {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div>
        
        <h1 className='m-4'>Profile page</h1>
        
        <h2 className='m-4 p-4 bg-green-500 text-white'>
            {params.id}
        </h2>
      </div>
    </div>
  )
}
