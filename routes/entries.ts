import * as express from 'express';
import {
  getEntryList,
  getEntryById,
  addEntry,
  updateEntry,
  deleteEntry,
} from '../controllers/entryController';

const router = express.Router();

router.get('/getEntries', getEntryList);
router.get('/getEntry/:id', getEntryById);
router.post('/addEntry', addEntry);
router.put('/updateEntry/:id', updateEntry);
router.delete('/deleteEntry/:id', deleteEntry);

export { router as entryRouter };
