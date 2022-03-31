import React from 'react'

function NFTDropPagex() {
  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-cyan-800 to-slate-600 justify-center ">
    {/* Left */}
        <div className='bg-gradient-to-br from-cyan-800 to-slate-600 w-100 h-100'>
            <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
               <div className='bg-gradient-to-br from-yellow-50 to-gray-700 rounded-full p-2'>
                    <img className='w-44 rounded-full object-cover lg:h-86 lg:w-72' src="https://i.imgur.com/nKqUUNw.jpeg" alt="" />
               </div>
                <div className='text-center p-5 space-y-2'>
                    <h1 className='text-4xl text-white font bold'>PRIMEUMATON</h1>
                    <h2 className='text-xl text-yellow-100'>iCode, iDeploy(), iLuv_my_wife().</h2>
                </div>
                <div className='bg-cyan-900 px-1 py-1'>
                    <a href="nft/deploy">
                        <button className=' bg-white px-6 py-2 font-bold text-cyan-900 lg:px-5 lg:py-3 lg:text-base text-xs'> CLICK HERE TO CONTINUE</button>
                    </a>
                </div>
            </div>
        </div>
        {/* Right */}
       
    </div>
  )
}

export default NFTDropPagex

