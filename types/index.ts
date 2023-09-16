import type { ObjectId } from 'bson'

export interface ICategory {
  id: ObjectId
  categoryName: string
  categoryImage?: string
}

export interface IProduct {
  productName: string
  productDescription?: string
  categoryId: string
  salePrice: number
  productImage?: string
  status: boolean
  feature: boolean
  favorite: boolean
  promotion: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface ISpecialProductItem {
  id: number
  data: Object
  label: string
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

export interface IToken {
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

export interface Category {
  id?: string
  categoryName: string
  categoryImage?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface colDef {
  id: string
  text: string
  type?: string
}
