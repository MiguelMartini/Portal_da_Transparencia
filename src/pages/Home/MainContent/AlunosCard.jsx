import React from 'react'

function AlunosCard({picture ,name}) {
  return (
    <div className='flex flex-col items-center bg-gray-100 rounded-2xl p-5 mt-5 w-60 h-60 shadow-xl/20'>
        <div className='bg-gray-400 rounded-full overflow-hidden'>
            <img src={picture} alt={`foto de perfilde ${name}`} className='w-32 h-32 object-cover'/>
        </div>
        <div className='flex flex-col items-center gap-2 mt-3'>
            <p className='text-xl font-semibold text-gray-700'>{name}</p>
        </div>
    </div>
  )
}

export default AlunosCard