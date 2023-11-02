import { ID } from 'appwrite'
import { account, appwriteConfig, avatars, databases } from '@/lib/server/config'
import { INewUser } from '@/types/user'

const createUserAccount = async (user: INewUser) => {
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

export {
  createUserAccount
}