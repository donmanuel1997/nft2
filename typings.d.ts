interface Image {
    asset: {
        url:string
    }

}

export interface Creator {
    _id: string
	name: string
	address: string
	slug: {
		current: string
	}
    Image: Image
    bio: string
}

export interface Collection {
    _id: string
	title: string
	address: string
	description: string
    nftCollectionName: string
    slug: {
		current: string
	}
    creator: string
	mainImage: string
    previewImage: string

}