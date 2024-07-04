import { Router } from 'express';
import EventController from '../controllers/EventController';

const eventRouter = Router();

const eventController = new EventController();

eventRouter.post('/', eventController.create);
eventRouter.get('/', eventController.listAll);

export default eventRouter;
