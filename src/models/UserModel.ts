import { Schema, model, models, Types} from 'mongoose';


interface IUser {
  first_name : string,
  last_name : string,
  phone_number : string,
  email : string,
  messages : Types.ObjectId[],

}

export const userSchema = new Schema<IUser>({
    first_name : {type: String, required:true},
    last_name : {type: String, required:true},
    phone_number : {type: String, required:true},
    email : {type:String, required:true},
    messages: [
        {
          type: Schema.Types.ObjectId,
          ref: "Message"
        }
    ],

  }, {timestamps:true});


const User = models.User<IUser> || model<IUser>('User', userSchema);

export default User;