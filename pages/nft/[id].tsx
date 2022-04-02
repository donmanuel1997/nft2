import React, { useEffect, useState } from 'react'
import { useAddress, useDisconnect, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings';
import Link from 'next/link';
import { BigNumber } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    collection: Collection
}
function NFTDropPage({collection}: Props) { 
    const [claimedSupply, setClaimedSupply] = useState<number>(0)
    const [totalSupply, setTotalSupply] = useState<BigNumber>()
    const [priceInEth, setPriceInEth] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const nftDrop = useNFTDrop(collection.address)
    
    

    //   Auth
    const connectWithMetamask = useMetamask()
    const address = useAddress()
    const disconnect = useDisconnect()
    // --



    useEffect(() => {
        if(!nftDrop) return;
        const fetchNFTDropData = async () => {
            setLoading(true);
                const claimed = await nftDrop.getAllClaimed();
                const total = await nftDrop.totalSupply();

                setClaimedSupply(claimed.length);
                setTotalSupply(total);
            setLoading(false);
        }
        fetchNFTDropData();
    } , [nftDrop])

    useEffect(() => {
        if(!nftDrop) return;
        const fetchPrice = async() => {
            const claimConditions = await nftDrop.claimConditions.getAll();
            setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
        } 
        fetchPrice();
    } , [nftDrop])

    const mintNft = () => {
        if(!nftDrop || !address) return;

        const quantity = 1;

        setLoading(true)
        const notification = toast.loading('Minting...', {
            style: {
                background: 'white',
                color: 'green',
                fontWeight: 'bolder',
                fontSize: '17px',
                padding: '20px',
            }

        })

        nftDrop.claimTo(address,quantity).then(async (tx) => {
                const receipt = tx[0].receipt
                const claimedTokenId = tx[0].id
                const claimedNFT = await tx[0].data()

                toast('$$$ Minting Successful $$$', {
                    duration: 8000,
                    style: {
                        background: 'green',
                        color: 'white',
                        fontWeight: 'bolder',
                        fontSize: '17px',
                        padding: '20px',
                    }
                }

                )
                
                
                console.log(receipt)
                console.log(claimedTokenId)
                console.log(claimedNFT)

        }).catch(err => {
            console.log(err)
            toast('An Error Occured!', {
                style: {
                    background: 'red',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px',
                }
            })
        }).finally(() => {
            setLoading(false)
            toast.dismiss(notification)
        })
    }
    

  return (
    // --

    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
     <Toaster position='bottom-center' />   
    {/* Left */}
        <div className='lg:col-span-3 bg-gradient-to-br from-cyan-800 to-slate-600 '>
            <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
               <div className='bg-gradient-to-br from-yellow-50 to-gray-700 rounded-full p-2'>
                    <img className='w-44 rounded-full object-cover lg:h-86 lg:w-72' src={urlFor(collection.previewImage).url()} alt="" />
               </div>
            <div className='text-center p-5 space-y-2'>
                <h1 className='text-4xl text-white font bold'>{collection.title}</h1>
                <h2 className='text-xl text-yellow-100'>{collection.description}</h2>
                
               <br/><hr />
               
            </div>
            </div>
        </div>
        {/* Right */}
        <div className='lg:col-span-7 flex flex-1 flex-col p-12'>
            {/* header */}
            <header className='flex items-center justify-between'>
                <Link href={'/'}>
                <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>
                    PRIME NFT {' '} 
                    <span className='font-extrabold underline decoration-gray-900/50'>APES</span>{' '}COLLECTIONS
                </h1>
                </Link>
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
                <img src="https://azbigmedia.com/wp-content/uploads/2021/10/nft.jpg" alt="" />
                
                 ) : (
                 <img src={urlFor(collection.mainImage).url()} alt="" />
                 )} 
                <h1 className=' text-extralight'>Welcome to Prime NFT Community, Connect your METAMASK Wallet to continue.</h1>
                <p className='pt-2 text-xl'></p>
                <div className='bg-cyan-900 px-1 py-1 '>
                {loading ? (
                      <button className='center bg-white px-6 py-2 font-bold text-cyan-900 lg:px-5 lg:py-3 lg:text-base text-xs animate-bounce'> Processing Supply Count.... <br/> <div className=' justify-items-center'><img className=' w-10' src="https://www.rag-exploration-production.at/typo3conf/ext/wp_bootstrap/Resources/Public/Img/theme_images/loading3.gif" alt="" /></div></button>
                  
                ) : (
                    <button className=' bg-white px-6 py-2 font-bold text-cyan-900 lg:px-5 lg:py-3 lg:text-base text-xs'>{claimedSupply} / {totalSupply?.toString()} NFTs Claimed </button>
                
                )}
                
                </div>
            </div>
            {/* button */}
            <div>
                <button onClick={mintNft} disabled={loading || claimedSupply === totalSupply?.toNumber() || !address} className='h-16 bg-cyan-900 w-full text-white disabled:bg-slate-300 disabled:text-blue-900'>
                    {loading ? (
                            <>Loading....</>
                    ): claimedSupply === totalSupply?.toNumber() ? (
                        <>SoldOut....</>
                    ): !address ? (
                        <>Sign in to MINT....</>  
                    ): (
                        <span className=' font-bold'> MINT NFT {priceInEth} ETH </span> 
                    )
                    }
                    
                </button>
            </div>   
        </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async({params}) => {
    const query = `*[_type == "collection" && slug.current == $id][0]{
        _id,
        title,
        address,
        description,
      nftCollectionName,
        mainImage {
            asset
        },
        previewImage {
            asset
        },
        circleImage {
            asset
        },
        slug {
            current
        },
        creator-> {
            _id,
            name,
            address,
            slug {
                current
            },
        },
    }`

const collection = await sanityClient.fetch(query, {
    id: params?.id
})

if (!collection){
    return{
        notFound: true
    }
}

return {
    props: {
        collection
    }
}


}
