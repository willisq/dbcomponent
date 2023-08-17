const dbcomponent = require("../src/DbComponent");
let db = null;
let DBConnection = require("./dbConnection.json");

describe("dbcomponent", () => {
    const jsonSentences = {
        "getNow": "SELECT COUNT(NOW());",
    }

    const sharedSentences = {
        "getSum": "SELECT 1+1 AS sum;"
    }
    beforeEach(() => {
        db = new dbcomponent(DBConnection.default);

        db.setSentences(jsonSentences);
        db.setSharedSentences(sharedSentences)
    });


    describe("Load sentences data", () => {

        it("Should load the shared json sentences", () => {
            const { sharedSentences: sentences } = db;

            expect(sentences).not.toBeUndefined();
            expect(sentences).toEqual(sharedSentences);
        });

        it("Should load the json sentences", () => {
            const { sentences } = db;

            expect(sentences).not.toBeUndefined();
            expect(sentences).toEqual(jsonSentences);
        });
    });


    describe("get Sentence string", () => {

        it("If the json sentences has the sentence, should return it", () => {
            const sentenceName = "getNow";

            const sentence = db.getSentence(sentenceName);

            expect(sentence).not.toBeUndefined();
            expect(sentence).toEqual(jsonSentences[sentenceName]);
        });

        it("If the shared json sentences has the sentence, should return it", () => {
            const sentenceName = "getSum";

            const sentence = db.getSentence(sentenceName);

            expect(sentence).not.toBeUndefined();
            expect(sentence).toEqual(sharedSentences[sentenceName]);
        });

        it("If the sentences doesn't exists in the json sentence nor shared json sentence, should throw error", () => {
            const sentenceName = "doenstExist";

            expect(() => db.getSentence(sentenceName)).toThrow(Error);
            expect(() => db.getSentence(sentenceName)).toThrow("There's no sentence");
        });
    });


    describe("Execute sentences", () => {

        it("Should execute a sentence in the json sentences", async () => {
            const sentenceName = "getNow";

            const { rows } = await db.execute(sentenceName);

            expect(rows).not.toBeUndefined();
            expect(rows.length).toBeGreaterThan(0);
            expect(rows[0].count).toBe("1");
        });

        it("Should execute a sentences in the shared json sentences", async () => {
            const sentenceName = "getSum";

            const { rows } = await db.execute(sentenceName);

            expect(rows).not.toBeUndefined();
            expect(rows.length).toBeGreaterThan(0);
            expect(rows[0].sum).toBe(2);
        });

        it("Should throw error if the json sentences has no the sentence", async () => {
            try {
                const sentenceName = "";
                await db.execute(sentenceName);
            } catch (e) {
                expect(e).toMatchObject(new Error("There's no sentence"))
            }
        });
    });

    describe("Change connection pool", () => {

        it("Should change the connection pool", ()=>{
            const connectionData = DBConnection.secondData;

            db.changePool(connectionData);

            expect(db.options).toEqual(DBConnection.secondData);

        });
    });
})