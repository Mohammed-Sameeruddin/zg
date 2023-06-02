// src/mocks/handlers.js
import { rest } from 'msw';
const data = require('./data.json');
export const handlers = [
  rest.get('/react-boilerplate-starter/sample-data', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),
];
