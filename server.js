import { handler } from './build/handler.js';
import express from 'express';
import cors from 'cors';

const app = express();

// add a route that lives separately from the SvelteKit app
// Set response header 'Access-Control-Allow-Origin : *'
app.use('/api', cors());
app.use('/api/project', cors());
// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
    console.log('Node app is running on port 3000');
});