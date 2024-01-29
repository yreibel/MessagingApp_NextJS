import { connectMongo } from "@/utils/connectMongo";

import mongoose from "mongoose";

import User from "@/models/UserModel";
import Message from "@/models/MessageModel";



export async function GET(req:Request) {
    
    const { searchParams } = new URL(req.url);
    const id : string | null = searchParams.get('id');

    let client
    try{
        client = await connectMongo();

        console.log("DB connected");
    }catch(error){
        console.log("error : ", error);
    }

    if(id === null){
        return;
    }

    const user = await User.findById(id).exec();
    
    const arr_response : typeof Message[] = []

    // Loop through all message references in paralell

    await Promise.all(user.messages.map(async (ref: string) => {
        const message = await Message.findById(ref).exec()
        arr_response.push(message);
    }));

    return new Response(JSON.stringify(arr_response), {
        headers:{
            "Content-Type":"application/json",
        },
        status:200,
    })

    
}

export async function POST(req:Request) {

    const message_json = await req.json();

    let client
    try{
        client = await connectMongo();

        console.log("DB connected");
    }catch(error){
        console.log("error : ", error);
    }


    const sender_id = new mongoose.Types.ObjectId(message_json.sender);
    const receiver_id = new mongoose.Types.ObjectId(message_json.receiver);

    const newMessage = {
        sender : sender_id,
        receiver : receiver_id,
        content: message_json.content,
    };


    const message = new Message(newMessage);
    console.log(message);
    await message.save();


    const sender = await User.findById(message_json.sender).exec();
    sender.messages.push(message._id);
    await sender.save();


    const receiver = await User.findById(message_json.receiver).exec();
    receiver.messages.push(message._id);
    await receiver.save();


    return new Response(JSON.stringify(newMessage), {
        headers:{
            "Content-Type":"application/json",
        },
        status:201,
    })
}