import connectDB from './db.js'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { errorHandler } from './errorHandler.js'

dotenv.config()
const {DB_COLLECTION2} = process.env

export const Course =
{
    people: async ({ people }) => {
        let db, peopleData, ids
        try {
            db = await connectDB()
            ids = people
            ? people.map(id => ObjectId(id))
            : []
            peopleData = ids.length>0
            ? await db.collection(DB_COLLECTION2).find(
                {_id: {$in: ids}}
                ).toArray()
            : []
            return peopleData
        } catch (error) {
            errorHandler(error)
        }
    },
}