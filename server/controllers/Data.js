import asyncHandler from '../utils/asyncHandler.js';
import Data from '../models/Data.js';

const getAllData = asyncHandler(async (req, res, next) => {
    const allData = await Data.find();
    res.status(200).send(allData);
});

export default getAllData;
