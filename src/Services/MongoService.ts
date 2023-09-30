import * as mongoDb from "mongodb"

export const collections: { audits?: mongoDb.Collection} = {}

export async function connectToDb() {
    const client: mongoDb.MongoClient = new mongoDb.MongoClient("mongodb+srv://stevenAdmin:GZCEWFTGlPoXsKMS@learningcluster.in6cs9i.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")

    await client.connect()

    const db: mongoDb.Db = client.db("LifeLogistics")

    collections.audits = db.collection("Audits")

    console.log("connected to the database and collection for auditing.")
}

connectToDb()