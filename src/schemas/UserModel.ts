import { model, Schema } from 'mongoose';

export interface IUser {
    username: string;
    password: string;
    email: string;
    refreshToken?: string;
    photo_url: string | null;
    save(): Promise<IUser>;
}

const UserSchema = new Schema(
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

export default model<IUser>('User', UserSchema);