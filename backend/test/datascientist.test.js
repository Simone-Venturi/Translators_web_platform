const request = require("supertest");
const app = require("../app");
const db = require("../src/db/models");
const seed = require("../src/db/seeders");

describe("Test datascientist interaction", () => {
    
    let accessToken = null;

    beforeAll(async () => {
        await db.sequelize.sync({force:true});
        await seed.runSeeders();
    });
        
    afterAll(async () => {
        await db.sequelize.close();
    });

    test('should create a new user', async () => {
        try {
            const res = await request(app)
            .post('/api/auth/signup')
            .send({
                username: "simoneds",
                email: "simone.venturi5@studio.unibo.it",
                password: "Simone123$",
                role: 2
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
            username: "simoneds",
            password: "Simone123$"
          })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('accessToken')
        accessToken = res.body.accessToken;
    })
    
    test('check Datascientist token', async () => {
        const res = await request(app)
            .get('/api/test/datascientist')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(res.statusCode).toEqual(200)
    })

    test('admin middleware should reject token', async () => {
        const res = await request(app)
            .get('/api/test/admin')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(res.statusCode).toEqual(403)
    })

    test('translator middleware should reject token', async () => {
        const res = await request(app)
            .get('/api/test/translator')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(res.statusCode).toEqual(403)
    })
    
    test('should retrieve Dataset size equals to 0', async () => {
        const res = await request(app)
            .post('/api/dataset/check')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
            .send({
                datasets:[null],
                languagesTo:[129, 215],
                minReviewScore:1,
                maxReviewScore:5,
                minReview:0
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('total')
        expect(res.body.total).toEqual(0)
    })
})