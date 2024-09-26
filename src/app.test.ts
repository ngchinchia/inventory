// app.test.ts
import request from 'supertest';
import app from './app'; // Adjust the import path as necessary

describe('Express App', () => {

    it('should respond to GET requests on the root path', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200); 
       
    });

    it('should respond to GET requests on the /test-db path', async () => {
        const response = await request(app).get('/test-db');
        expect(response.status).toBe(200); 
       
    });

    it('should respond to GET requests on the /v1/api/items path', async () => {
        const response = await request(app).get('/v1/api/items');
        expect(response.status).toBe(200); 
    });

    it('should respond to GET requests on the /v1/api/locations path', async () => {
        const response = await request(app).get('/v1/api/locations');
        expect(response.status).toBe(200); 
    });

    it('should handle errors', async () => {
        const response = await request(app).get('/non-existent-route'); 
        expect(response.status).toBe(404); 
    });
});
