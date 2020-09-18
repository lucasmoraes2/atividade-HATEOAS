import express from 'express';
import knex from './database/connection';

const routes = express.Router();

interface Series {
    id: number;
    name: string;
}

interface Season {
    id: number;
    name: string;
    series_id: number;
}

/**
 * Series routes
 */

routes.get('/series', async (request, response) => {
    const series: Series[] = await knex('series').select('*');

    series.map(async (item) => {
        Object.assign(item, {seasons: `http://localhost:3333/series/${item.id}/seasons`})
    });
    
    return response.json({ series });
});

routes.get('/series/:id', async (request, response) => {
    const { id } = request.params;

    const series = await knex('series').where('id', id).first();

    return response.json(series);
});

routes.post('/series', async (request, response) => {
    const { name } = request.body;

    await knex('series').insert({ name });

    return response.json({ success: true });
});

routes.put('/series/:id', async (request, response) => {
    const { id } = request.params;
    const { name } = request.body;

    await knex('series').where('id', id).update({ name });

    return response.json({ success: true });
});

routes.delete('/series/:id', async (request, response) => {
    const { id } = request.params;

    await knex('series').where('id', id).delete();

    return response.json({ success: true });
});

/**
 * Seasons routes
 */

routes.get('/series/:series_id/seasons', async (request, response) => {
    const { series_id } = request.params;

    const seasons: Season[] = await knex.from('seasons').where('series_id', series_id);

    return response.json(seasons);
});

routes.post('/seasons', async (request, response) => {
    const { name, series_id } = request.body;

    await knex('seasons').insert({ name, series_id });

    return response.json({ success: true });
});

export default routes;