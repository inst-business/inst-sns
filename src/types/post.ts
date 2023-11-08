import { Models } from 'appwrite'
import { IUserDocument } from './user'

export interface IPostDocument extends Models.Document {
  creator: IUserDocument
  caption: string
  tags: string[]
  imageId: string
  imageUrl: URL
  location?: string
  // likes: 
  // save: 
}

export interface INewPost {
  userId: string
  caption: string
  files: File[]
  location?: string
  tags?: string
}

export interface IUpdatePost {
  postId: string
  caption: string
  imageId: string
  imageUrl: URL
  files: File[]
  location?: string
  tags?: string
}