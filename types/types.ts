import { ObjectId } from 'bson'

export interface ICategory {
    id: ObjectId
    categoryName: string
}

export interface IProduct {
    id: ObjectId
    productName: string
    productDescription: string
    productCategory: string
    productPrice?: number
    productImage: string
    isActive?: Boolean
    role: string
}

export interface IUser {
    id: string
    name: string
    email: string
    password: string
    profileImage?: string
    status: boolean
    isAdmin: boolean
    role: string
}

export interface IUsers {
    id: string
    name: string
    email: string
    password: string
    profileImage?: string
    status: boolean
    accessToken: string
    refreshToken: string
    isAdmin: boolean
}

export interface ILogin {
    email: string
    password: string
}

export interface IRegister {
    name: string
    email: string
    password: string
    repeatPassword: string
}

export interface IRefreshToken {
    token: string
    userId: string
}

export interface IResponseLogin {
    access_token: string
    user: {
        id: string
        email: string
        isAdmin: boolean
        role: string
        status: boolean
        profileImage?: string
    }
}