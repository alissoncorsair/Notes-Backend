import { Types, model, Schema } from 'mongoose';

export interface INote {
    title: string,
    content: string,
    author: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    save(): Promise<INote>
}

const NoteSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        timestamps: true
    }
);

export default model<INote>('Note', NoteSchema);