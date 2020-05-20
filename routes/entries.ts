import * as express from 'express';
import {
  getEntryList,
  getEntryById,
  addEntry,
  updateEntry,
  deleteEntry,
} from '../controllers/entryController';
import { authenticateHeader } from '../services/authService';
const router = express.Router();

router.get('/getEntries', authenticateHeader, getEntryList);
router.get('/getEntry/:id', authenticateHeader, getEntryById);
router.post('/addEntry', authenticateHeader, addEntry);
router.put('/updateEntry/:id', authenticateHeader, updateEntry);
router.delete('/deleteEntry/:id', authenticateHeader, deleteEntry);

export { router as entryRouter };
