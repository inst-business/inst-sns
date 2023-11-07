
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