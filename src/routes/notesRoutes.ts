import { Router } from 'express';
import NotesController from '../controllers/NotesController';
import { extractJWT } from '../middleware/extractJWT';

export const notesRouter = Router();

notesRouter.get('/', extractJWT, NotesController.index);
notesRouter.post('/', extractJWT, NotesController.create);
notesRouter.put('/:id', extractJWT, NotesController.update);
notesRouter.delete('/:id', extractJWT, NotesController.delete);
