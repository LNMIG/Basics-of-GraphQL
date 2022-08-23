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
export const Person =
{
    __resolveType: (person, context, info) =>{
        if(person.phone) return 'Monitor'
        return 'Student'
    }
}

export const GlobalSearch =
{
    __resolveType: (item, context, info) =>{
        if(item.title) return 'Course'
        if(item.phone) return 'Monitor' 
        return 'Student'
    }
}