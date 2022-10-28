const request = require("supertest");
const app = require("../app");
const db = require("../src/db/models");
const seed = require("../src/db/seeders/test.seeder");

describe("Test translator interaction", () => {
    
    let accessToken = null;

    beforeAll(async () => {
        await db.sequelize.sync({force:true});
        await seed.translatorTestSeeds();
    });
        
    afterAll(async () => {
        await db.sequelize.close();
    });

    test('should create a new user', async () => {
        try {
            const res = await request(app)
            .post('/api/auth/signup')
            .send({
                username: "simonet",
                email: "simone.venturi5@studio.unibo.it",
                password: "Simone123$",
                role: 1
            })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('message')
        } catch (e){
            console.log(e)
        }
    })
    
    test('should login', async () => {
        const res = await request(app)
          .post('/api/auth/signin')
          .send({
            username: "simonet",
            password: "Simone123$"
          })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('accessToken')
        accessToken = res.body.accessToken;
    })
    
    test('check Translator token', async () => {
        const res = await request(app)
            .get('/api/test/translator')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(res.statusCode).toEqual(200)
    })

    test('admin middleware should reject token', async () => {
        const res = await request(app)
            .get('/api/test/admin')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(res.statusCode).toEqual(403)
    })

    test('datascientist middleware should reject token', async () => {
        const res = await request(app)
            .get('/api/test/datascientist')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(res.statusCode).toEqual(403)
    })
})