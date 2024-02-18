import User, { IUserD } from '@/models/UserModel';
import { connectMongo } from '@/utils/connectMongo';

/**
 * Retrieve the user based on email
 * @param email
 * @returns
 */
export async function getUserByEmail(email: string) {
    let client;
    try {
        client = await connectMongo();

        console.log('DB connected');
    } catch (error) {
        console.log('error : ', error);
    }
    const user = await User.findOne({ email: email });

    return user;
}

/**
 * Check if user email exists in db
 * @param email
 * @returns
 */
export async function checkIfEmailExists(email: string) {
    console.log('check if email exists function');
    let client;

    try {
        client = await connectMongo();

        console.log('DB connected');
    } catch (error) {
        console.log('error : ', error);
    }
    const user = await User.findOne({ email: email });

    if (user) {
        console.log('user email exists in db : true');
        return true;
    }

    return false;
}
