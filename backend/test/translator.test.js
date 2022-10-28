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
        await db.mongoConnection.disconnect()
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
    
    test('should create a review', async () => {
        const res = await request(app)
            .post('/api/review/create')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
            .send({
                idTranslation: 3,
                rateReview: 5
            })
        expect(res.statusCode).toEqual(200)
    })

    test('should check the last translation reviewed (id=3) has 5 stars as average score', async () => {
        const resTranslations = await request(app)
            .get('/api/translation/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resTranslations.statusCode).toEqual(200)
        const translation = resTranslations.body.filter(t => t.id == 3)[0]
        expect(translation.average_score).toEqual(5)
    })

    test('should check the last translation reviewed (id=3) has 1 as review counter', async () => {
        const resTranslations = await request(app)
            .get('/api/translation/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resTranslations.statusCode).toEqual(200)
        const translation = resTranslations.body.filter(t => t.id == 3)[0]
        expect(translation.n_scores).toEqual(1)
    })

    // Test alignment features
    test('should check the number of parallel text available for an user without languages', async () => {
        const resParallelText = await request(app)
            .get('/api/alignment/available')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
            expect(resParallelText.statusCode).toEqual(200)
            expect(resParallelText.body.length).toEqual(0)
    })

    test('should check the number of parallel text available for an user with languages', async () => {
        const res = await request(app)
            .post('/api/language/known')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
            .send({
                idsLanguages: [133,215]
            })
        expect(res.statusCode).toEqual(200)
        const resParallelText = await request(app)
            .get('/api/alignment/available')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resParallelText.statusCode).toEqual(200)
        expect(resParallelText.body.length).toEqual(3)
    })

    test('should align a parallel text. Should create 2 new translations and 4 new sentences', async () => {
        const resSentencesBefore = await request(app)
            .get('/api/sentence/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resSentencesBefore.statusCode).toEqual(200)
        const nSentencesBefore = resSentencesBefore.body.length

        const resTranslationsBefore = await request(app)
            .get('/api/translation/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resTranslationsBefore.statusCode).toEqual(200)
        const nTranslationsBefore = resTranslationsBefore.body.length

        const res = await request(app)
            .post('/api/alignment/create')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
            .send({
                idParallelText: 3,
                translationObjectsArray: [{
                    original_sentence: "No soy extraño.",
                    translated_sentence: "Non sono strano."
                }, {
                    original_sentence: "Sólo no soy normal.",
                    translated_sentence: "È solo che non sono normale."
                }],
                sentenceArrayOriginal: [],
                sentenceArrayTranslated: []
            })
        expect(res.statusCode).toEqual(200)

        const resSentencesAfter = await request(app)
            .get('/api/sentence/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resSentencesAfter.statusCode).toEqual(200)        
        expect(resSentencesAfter.body.length).toEqual(nSentencesBefore + 4)

        const resTranslationsAfter = await request(app)
            .get('/api/translation/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })        
        expect(resTranslationsAfter.statusCode).toEqual(200)
        expect(resTranslationsAfter.body.length).toEqual(nTranslationsBefore + 2)
    })

    test('should align a parallel text. Should create 1 new translation and 4 new sentences', async () => {
        const resSentencesBefore = await request(app)
            .get('/api/sentence/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resSentencesBefore.statusCode).toEqual(200)
        const nSentencesBefore = resSentencesBefore.body.length

        const resTranslationsBefore = await request(app)
            .get('/api/translation/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resTranslationsBefore.statusCode).toEqual(200)
        const nTranslationsBefore = resTranslationsBefore.body.length

        const res = await request(app)
            .post('/api/alignment/create')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
            .send({
                idParallelText: 2,
                translationObjectsArray: [{
                    original_sentence: "No existe la muerte.",
                    translated_sentence: "La morte non esiste."
                }],
                sentenceArrayOriginal: ["La gente solo muere cuando nos olvidamos de ellos."],
                sentenceArrayTranslated: ["Le persone muoiono solo quando ci dimentichiamo di loro."]
            })
        expect(res.statusCode).toEqual(200)

        const resSentencesAfter = await request(app)
            .get('/api/sentence/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(resSentencesAfter.statusCode).toEqual(200)        
        expect(resSentencesAfter.body.length).toEqual(nSentencesBefore + 4)

        const resTranslationsAfter = await request(app)
            .get('/api/translation/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })        
        expect(resTranslationsAfter.statusCode).toEqual(200)
        expect(resTranslationsAfter.body.length).toEqual(nTranslationsBefore + 1)
    })

    test('check profile statistics: 1 translation, 2 alignments, 1 review should be done', async () => {
        const res = await request(app)
            .get('/api/profile/all')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(res.statusCode).toEqual(200)
        expect(res.body.translations).toEqual(1)
        expect(res.body.alignments).toEqual(2)
        expect(res.body.reviews).toEqual(1)
    })
})