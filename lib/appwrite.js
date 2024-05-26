import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.h2go",
  projectId: "663e23930008dc6117cf",
  databaseId: "663e2625002293d0498b",
  userCollectionId: "663e42410039cb090418",
  vendingMachinesCollectionId: "663e42540031fd4b1737",
  ordersCollectionId: "663e4545002b797511e5",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email,
  firstName,
  lastName,
  password,
  phoneNumber
) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password);
    if (!newAccount) throw Error;

    const fullName = firstName + lastName;

    const avatarUrl = avatars.getInitials(fullName);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        userId: newAccount.$id,
        email,
        firstName,
        lastName,
        phoneNumber,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();
    console.log(currentAccount);
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("userId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
      console.log(currentUser.documents[0])
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
