import express from 'express';

import httpSearchBooks from './googleApi.controller';

const googleApiRouter = express.Router();

// - /googleApi
googleApiRouter.get('/search', httpSearchBooks);

export default googleApiRouter;