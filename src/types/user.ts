import { Models } from 'appwrite'

export interface IAccount {
  name: string
  email: string
  username: string
  password: string
}

export interface IUser {
  id: string
  name: string
  username: string
  email: string
  imageUrl: string
  bio: string
}

export type IUserDocument = IUser & Models.Document

export interface IUpdateUser {
  userId: string
  name: string
  bio: string
  imageId: string
  imageUrl: URL | string
  file: File[]
}