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

    // Test translate features
    test('should create a new translation', async () => {
        const resNTranslation = await request(app)
            .get('/api/translation/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resNTranslation.statusCode).toEqual(200)
        const nTranslation = resNTranslation.body.length

        const res = await request(app)
            .post('/api/translation/create')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
            .send({
                translationText: "Szia",
                idLanguage: 199,
                idSentence: 8
            })
        expect(res.statusCode).toEqual(200)

        const resNTranslation1 = await request(app)
            .get('/api/translation/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resNTranslation1.statusCode).toEqual(200)
        expect(resNTranslation1.body.length).toEqual(nTranslation+1)
    })

    // Test review features    
    test('same languages should have the same number of available translations to be reviewed', async () => {
        const resNSentences = await request(app)
            .get('/api/translation/allNotReviewed/130/133')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resNSentences.statusCode).toEqual(200)
        const nSentences = resNSentences.body.length

        const resNSentences1 = await request(app)
            .get('/api/translation/allNotReviewed/133/130')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resNSentences1.statusCode).toEqual(200)
        expect(resNSentences1.body.length).toEqual(nSentences)
    })
})