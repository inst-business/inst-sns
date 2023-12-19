import { ID, Models, Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases, storage } from '@/lib/server/config'
import { IAccount, IUserDocument } from '@/types/user'
import { INewPost, IPostDocument, IUpdatePost } from '@/types/post'


const createUserAccount = async (user: IAccount) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(user.name)
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
      username: user.username,
    })

    return newUser 
  }
  catch (e) {
    console.error(e)
    return e
  }
}


const saveUserToDB = async (user: {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username?: string
}) => {
  try {
    const { databaseId, usersCollectionId } = appwriteConfig
    const newUser = await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      user,
    )
    return newUser
  }
  catch (e) {
    console.error(e)
    return e
  }
}

const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw Error
    const { databaseId, usersCollectionId } = appwriteConfig
    const currentUser: Models.DocumentList<IUserDocument> = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    )
    if (!currentUser) throw Error
    return currentUser.documents[0]
  }
  catch (e) {
    console.error(e)
    // return e
  }
}


const loginAccount = async (user: Pick<IAccount, 'email' | 'password'>) => {
  try {
    const { email, password } = user
    const session = await account.createEmailSession(email, password)
    return session
  }
  catch (e) {
    console.error(e)
    return e
  }
}


const logoutAccount = async () => {
  try {
    const session = await account.deleteSession('current')
    return session
  }
  catch (e) {
    console.error(e)
    return e
  }
}


const uploadFile = async (file: File) => {
  try {
    const { storageId } = appwriteConfig
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      file,
    )
    return uploadedFile
  }
  catch (e) {
    console.error(e)
    // return e
  }
}

const deleteFile = async (fileId: string) => {
  try {
    const { storageId } = appwriteConfig
    await storage.deleteFile(
      storageId,
      fileId,
    )
    return { status: 'ok' }
  }
  catch (e) {
    console.error(e)
    // return e
  }
}

const getFilePreview = (fileId: string) => {
  try {
    const { storageId } = appwriteConfig
    const fileUrl = storage.getFilePreview(
      storageId,
      fileId,
      2000,
      2000,
      'top',
      100,
    )
    return fileUrl
  }
  catch (e) {
    console.error(e)
    // return e
  }
}

const createPost = async (post: INewPost) => {
  try {
    const uploadedFile = await uploadFile(post.files[0])
    if (!uploadedFile) throw Error
    const fileUrl = getFilePreview(uploadedFile.$id)
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id)
      throw Error
    }
    const tags = post.tags?.replace(/ /g, '').split(',') || []
    const { databaseId, postsCollectionId } = appwriteConfig
    const newPost = await databases.createDocument(
      databaseId,
      postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags,
      }
    )
    if (!newPost) {
      await deleteFile(uploadedFile.$id)
      throw Error
    }
    return newPost
  }
  catch (e) {
    console.error(e)
    return e
  }
}

const updatePost = async (post: IUpdatePost) => {
  const hasFileToUpdate = post.files.length > 0
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    }
    if (hasFileToUpdate) {
      // console.log('hasFileToUpdate', post.files[0])
      const uploadedFile = await uploadFile(post.files[0])
      if (!uploadedFile) throw Error
      const fileUrl = getFilePreview(uploadedFile.$id)
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id)
        throw Error
      }
      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id }
    }
    const tags = post.tags?.replace(/ /g, '').split(',') || []
    const { databaseId, postsCollectionId } = appwriteConfig
    const updatedPost = await databases.updateDocument(
      databaseId,
      postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags,
      }
    )
    if (!updatedPost) {
      await deleteFile(post.imageId)
      throw Error
    }
    return updatedPost
  }
  catch (e) {
    console.error(e)
    // return e
  }
}

const deletePost = async (postId: string, imageId: string) => {
  if (!postId || !imageId) throw Error
  try {
    const { databaseId, postsCollectionId } = appwriteConfig
    await databases.deleteDocument(
      databaseId,
      postsCollectionId,
      postId,
    )
    return { status: 'ok' }
  }
  catch (e) {
    console.error(e)
  }
}

const getRecentPosts = async () => {
  const { databaseId, postsCollectionId } = appwriteConfig
  const posts = await databases.listDocuments(
    databaseId,
    postsCollectionId,
    [Query.orderDesc('$createdAt'), Query.limit(20)]
  )
  if (!posts) throw Error
  return posts
}

const getInfinitePosts = async ({ pageParam }: { pageParam?: string }) => {
  const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(10)]
  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()))
  }

  try {
    const { databaseId, postsCollectionId } = appwriteConfig
    const posts = await databases.listDocuments(
      databaseId,
      postsCollectionId,
      queries,
    )
    if (!posts) throw Error
    return posts as any
  }
  catch (e) {
    
  }
}

const searchPosts = async (searchTerm: string) => {
  try {
    const { databaseId, postsCollectionId } = appwriteConfig
    const posts = await databases.listDocuments(
      databaseId,
      postsCollectionId,
      [Query.search('caption', searchTerm)],
    )
    if (!posts) throw Error
    return posts as Models.DocumentList<IPostDocument>
  }
  catch (e) {
    
  }
}



const getPostById = async (postId: string) => {
  try {
    const { databaseId, postsCollectionId } = appwriteConfig
    const post = await databases.getDocument(
      databaseId,
      postsCollectionId,
      postId
    )
    return post as IPostDocument
  }
  catch (e) {
    console.error(e)
  }
}


const likePost = async (postId: string, likesArray: string[]) => {
  try {
    const { databaseId, postsCollectionId } = appwriteConfig
    const updatedPost = await databases.updateDocument(
      databaseId,
      postsCollectionId,
      postId,
      {
        likes: likesArray,
      }
    )
    if (!updatedPost) throw Error
    return updatedPost
  }
  catch (e) {
    console.error(e)
  }
}


const savePost = async (postId: string, userId: string) => {
  try {
    const { databaseId, savesCollectionId } = appwriteConfig
    const updatedPost = await databases.createDocument(
      databaseId,
      savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    )
    if (!updatedPost) throw Error
    return updatedPost
  }
  catch (e) {
    console.error(e)
  }
}


const deleteSavedPost = async (savedRecordId: string) => {
  try {
    const { databaseId, savesCollectionId } = appwriteConfig
    const deletedSavedPost = await databases.deleteDocument(
      databaseId,
      savesCollectionId,
      savedRecordId,
    )
    if (!deletedSavedPost) throw Error
    return { status: 'ok' }
  }
  catch (e) {
    console.error(e)
  }
}


export {
  createUserAccount,
  getCurrentUser,
  loginAccount,
  logoutAccount,
  createPost,
  updatePost,
  deletePost,
  getRecentPosts,
  getInfinitePosts,
  searchPosts,
  getPostById,
  likePost,
  savePost,
  deleteSavedPost,
}