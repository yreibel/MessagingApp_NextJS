import { Schema, model, models, Types } from 'mongoose';

interface IUser {
    nickname: String;
    phone_number: string;
    email: string;
    password: string;
    messages: Types.ObjectId[];
}

export const userSchema = new Schema<IUser>(
    {
        nickname: { type: String, required: true },
        phone_number: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Message',
            },
        ],
    },
    { timestamps: true },
);

const User = models.User<IUser> || model<IUser>('User', userSchema);

export default User;
