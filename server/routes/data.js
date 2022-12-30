import express from 'express';
import getAllData from '../controllers/Data.js';

const dataRouter = express.Router();

/* GET users listing. */
dataRouter.route('/data').get(getAllData);
export default dataRouter;
