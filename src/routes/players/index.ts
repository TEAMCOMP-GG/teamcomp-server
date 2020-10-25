import { Router } from 'express';
import { scoutPlayers, addPlayer } from './players';

const router = Router();

// POST api/players/scout
router.post('/scout', scoutPlayers);
// POST api/players/add
router.post('/add', addPlayer);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
