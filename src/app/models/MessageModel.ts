import { Schema, model, models, Types } from 'mongoose';


interface IMessage {
  sender : Types.ObjectId,
  receiver : Types.ObjectId
  content: string,
}

export const messageSchema : Schema = new Schema<IMessage>({
    sender : {type: Schema.Types.ObjectId, ref: "User", required:true},
    receiver : {type: Schema.Types.ObjectId, ref:"User", required:true},
    content: {type:String, required:true},
   
  }, {timestamps:true});


const Message = models.Message<IMessage> || model<IMessage>('Message', messageSchema);

export default Message;