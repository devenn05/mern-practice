export interface Product{
    id: string,
    name: string, 
    price: number
}

export interface CartItem extends Product {
    quantity: number;
}

export interface UserProfile{
    name: string,
    email: string,
    address: {
        city: string,
        country: string
    }
}

