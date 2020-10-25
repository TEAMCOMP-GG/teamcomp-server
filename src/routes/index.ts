import { Router } from 'express';
import PlayersRouter from './players';

const router = Router();

router.use('/players', PlayersRouter);
// router.use('/games', GamesRouter);

export default router;
