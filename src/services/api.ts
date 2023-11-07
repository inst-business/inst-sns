import { ID, Models, Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases, storage } from '@/lib/server/config'
import { IAccount, IUser } from '@/types/user'
import { INewPost } from '@/types/post'


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
    const currentUser: Models.DocumentList<Models.Document & IUser> = await databases.listDocuments(
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

const getFilePreview = async (fileId: string) => {
  try {
    const { storageId } = appwriteConfig
    const fileUrl = await storage.getFilePreview(
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
    return e
  }
}

const createPost = async (post: INewPost) => {
  try {
    const uploadedFile = await uploadFile(post.files[0])
    if (!uploadedFile) throw Error
    const fileUrl = getFilePreview(uploadedFile.$id)
    if (!fileUrl) {
      deleteFile(uploadedFile.$id)
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
      deleteFile(uploadedFile.$id)
      throw Error
    }
    return newPost
  }
  catch (e) {
    console.error(e)
    return e
  }
}


export {
  createUserAccount,
  getCurrentUser,
  loginAccount,
  logoutAccount,
  createPost,
}