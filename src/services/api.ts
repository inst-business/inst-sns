import { ID, Models, Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases } from '@/lib/server/config'
import { IAccount, IUser } from '@/types/user'


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


const logInAccount = async (user: Pick<IAccount, 'email' | 'password'>) => {
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


export {
  createUserAccount,
  logInAccount,
  getCurrentUser
}