import User, { IUserD } from '@/models/UserModel';
import { connectMongo } from '@/utils/connectMongo';

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
