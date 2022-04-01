import React from 'react'
import type { GetServerSideProps , NextPage} from 'next'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
    collections: Collection[];
}

const Home = ({ collections }: Props) => {
  return (
  <div className="flex h-screen flex-col bg-gradient-to-br from-cyan-800 to-slate-600">
     <div className="header-2">

<nav className="bg-white py-2 md:py-4">
  <div className="container px-4 mx-auto md:flex md:items-center">

    <div className="flex justify-between items-center">
      <a href="#" className="font-bold text-xl text-indigo-600">NFT APES </a>
      <button className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
        <i className="fas fa-bars"></i>
      </button>
    </div>

    <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
      <a href="#" className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600">Recent Sales</a>
      <a href="#" className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300">Buy Now</a>
      <a href="#" className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"> Contact </a>
    </div>
  </div>
</nav>
</div>
    
<div className="team-2 bg-gray-800 py-6 md:py-12 min-h-screen">
  <div className="container mx-auto px-4">

    <div className="md:w-10/12 xl:w-8/12 md:mx-auto">
      <h1 className="font-medium text-3xl md:text-4xl text-white text-center mb-4">NFT APES MARKET PLACE</h1> </div>
  </div>
  <div className=" py-6 md:py-1 min-h-screen">
  <div className="container mx-auto px-4">

    <div className="md:flex md:-mx-2 mt-1 md:mt-1 xl:pt-12 px-1 md:px-0">

      <div className="team-profile-wrap bg-white mx-auto md:w-1/5 px-1 md:py-2">
        <div className="team-profile text-center p-10">
          
          <main>
        <div>
            {collections.map(collection => (
                <a href={`/nft/${collection.slug.current}`}>
                <div>
                <div className="w-32 h-34 mx-auto rounded-full overflow-hidden">
                    <img src={urlFor(collection.mainImage).url()} alt="" />
                    <div></div>
                </div>
                <p  className="">{collection.title}</p>
                <p className="text-gray-600 text-sm">{collection.description}</p>
                </div>
                </a>
            ))}
        </div>
    </main>
         
        </div>
       </div>
    </div>
    </div> 
</div>


      



  </div>
   
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
    const query = `*[_type == "collection"]{
        _id,
        title,
        address,
        description,
      nftCollectionName,
        mainImage {
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

const collections = await sanityClient.fetch(query)
console.log(collections)
return {
    props: {
        collections
    }
}
}
