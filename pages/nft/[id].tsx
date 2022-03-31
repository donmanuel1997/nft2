import React from 'react'
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

function NFTDropPage() { 
    //   Auth
    const connectWithMetamask = useMetamask()
    const address = useAddress()
    const disconnect = useDisconnect()
    // --
  return (
    // --
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
    {/* Left */}
        <div className='lg:col-span-3 bg-gradient-to-br from-cyan-800 to-slate-600 '>
            <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
               <div className='bg-gradient-to-br from-yellow-50 to-gray-700 rounded-full p-2'>
                    <img className='w-44 rounded-full object-cover lg:h-86 lg:w-72' src="https://i.imgur.com/nKqUUNw.jpeg" alt="" />
               </div>
            <div className='text-center p-5 space-y-2'>
                <h1 className='text-4xl text-white font bold'>PRIMEUMATON</h1>
                <h2 className='text-xl text-yellow-100'>iCode, iDeploy(), iLuv_my_wife().</h2>
            </div>
            </div>
        </div>
        {/* Right */}
        <div className='lg:col-span-7 flex flex-1 flex-col p-12'>
            {/* header */}
            <header className='flex items-center justify-between'>
                <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>
                    NFT {' '} 
                    <span className='font-extrabold underline decoration-gray-900/50'>METAMASK</span>{' '}LOGIN
                </h1>

            {address ? (
            <button onClick={() => disconnect()} className=' rounded-full bg-slate-700 px-6 py-2 font-extralight text-white lg:px-5 lg:py-3 lg:text-base text-xs'>Sign Out</button>
            ) : (
            <button onClick={() => connectWithMetamask()} className=' rounded-full bg-slate-700 px-6 py-2 font-extralight text-white lg:px-5 lg:py-3 lg:text-base text-xs'>Sign In</button>
            )}    
           
            </header>
            
            <hr className='my-2 border'></hr>
            {address ? (
             <div className='bg-cyan-900 px-1 py-1 items-center'>
             <button className=' px-6 py-2 font-bold text-white  lg:px-5 lg:py-3 lg:text-base text-xs'>You are logged in with the Wallet: {address.substring(0,7)}...{address.substring(address.length-2)}</button>
             </div>
             ) : (
                 ""
             )}
            {/* content */}
            <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center'>
                {address ? (
                <img src="https://i.gifer.com/HBZz.gif" alt="" />
                
                 ) : (
                 <img src="https://www.esri.com/about/newsroom/wp-content/uploads/2021/06/wherenext-where-in-the-world-Is-crypto-used-wide-1920x1080-1.jpg" alt="" />
                 )} 
                <h1 className=' text-extralight'>Welcome to PRIMEUMATON Community, Connect your METAMASK Wallet to continue.</h1>
                <p className='pt-2 text-xl'></p>
                <div className='bg-cyan-900 px-1 py-1'>
                <button className=' bg-white px-6 py-2 font-bold text-cyan-900 lg:px-5 lg:py-3 lg:text-base text-xs'>300 / 301 NFTs Claimed </button>
                </div>
            </div>
            {/* button */}
            <div>
                <button className='h-16 bg-cyan-900 w-full text-white'>MINT NFT (0.01 ETH) </button>
            </div>   
        </div>
    </div>
  )
}

export default NFTDropPage

