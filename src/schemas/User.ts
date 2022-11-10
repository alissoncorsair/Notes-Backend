import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    refreshToken?: string;
    photo_url: string|null;
};

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        refreshToken: { type: String, required: false },
        photo_url: { type: String, required: false }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUser>('User', UserSchema);