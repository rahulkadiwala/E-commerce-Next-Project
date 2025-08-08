import mongoose, { Document, Schema } from "mongoose";

export interface UserDocumnet extends Document{
    email: string;
    username: string;
    password: string;
}

const userSchem: Schema = new Schema<UserDocumnet>({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

},{timestamps: true});

export const User = mongoose.models.User || mongoose.model("User", userSchem);