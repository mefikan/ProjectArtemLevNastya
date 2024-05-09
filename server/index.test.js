const request = require('supertest');
const app = require('./index');

describe('Express App', () => {
    // Тест для успешного GET запроса
    it('should respond with 200 and expected message for GET /api/test', async () => {
        const response = await request(app).get('/api/test');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Test route is working' });
    });

    // Тест для успешного POST запроса
    it('should respond with 201 and saved data for POST /api/data', async () => {
        const testData = { name: 'John Doe' };

        const response = await request(app)
            .post('/api/data')
            .send(testData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(testData.name);
    });

    // Тест для обработки ошибки 404 (неопределенный маршрут)
    it('should respond with 404 for undefined route', async () => {
        const response = await request(app).get('/undefined-route');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Not found' });
    });

    // Тест для обработки ошибки 400 (некорректные данные в POST запросе)
    it('should respond with 400 for POST /api/data with missing name', async () => {
        const response = await request(app)
            .post('/api/data')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Name is required' });
    });

    // Тест для обработки ошибки 500 (внутренняя ошибка сервера)
    it('should respond with 500 for internal server error', async () => {
        // Здесь эмулируем внутреннюю ошибку, например, вызов несуществующей функции
        const response = await request(app)
            .get('/api/error');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});