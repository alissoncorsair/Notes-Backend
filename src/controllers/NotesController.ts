import { Request, Response } from 'express';
import NoteModel from '../schemas/NoteModel';

type ValidatedInput = {
    [index: string]: boolean
};

const isValid = (title: string, content: string, author: string): { [index: string]: string; } => {
    const validator: ValidatedInput = {
        title: title ? true : false,
        content: content ? true : false,
        author: author ? true : false
    };
    const invalid: { [index: string]: string } = {};
    for (const property in validator) {
        if (validator[property] === false) {
            invalid[property] = `${property} is required`;
        }
    }
    return invalid;
};

class NotesController {
    public async index(req: Request, res: Response) {
        // const note = await NoteModel.find().populate<{ author: IUser }>('author');
        try {
            
            const notes = (await NoteModel.find({ author: res.locals.jwt.id })).sort((a, b) => {
                return a.createdAt > b.createdAt ? -1 : 1
            });

            return res.json({ notes })
        } catch (e) {
            return res.status(400).json({ message: "Something went wrong!", error: e });
        }

    }

    public async create(req: Request, res: Response) {
        const { title, content } = req.body;
        const author = res.locals.jwt.id;
        const invalid = isValid(title, content, author);
        if (Object.keys(invalid).length) {
            return res.status(400).json({ error: invalid })
        }
        const note = await NoteModel.create({ title, content, author });
        return res.status(201).json({ message: "Nota criada", note })
    }

    public async update(req: Request, res: Response) {
        const { title, content } = req.body;
        const { id } = req.params;
        try {
            const note = await NoteModel.findOne({ id: id });
            if (note) {
                note.title = title || note.title;
                note.content = content || content.title;
                await note.save();
            }

            return res.json({ message: "Nota atualizada" });
        } catch (e) {
            return res.status(400).json({ error: "Ocorreu algum erro ao tentar atualizar a nota" });
        }

    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await NoteModel.findByIdAndDelete(id);
            return res.json({ message: "Nota deletada" });
        } catch (e) {
            return res.status(400).json({ error: "Ocorreu algum erro ao tentar apagar a nota" });
        }
    }
}

export default new NotesController();