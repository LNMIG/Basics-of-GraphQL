import connectDB from './db.js'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { errorHandler } from './errorHandler.js'

dotenv.config()
const {DB_COLLECTION1, DB_COLLECTION2} = process.env

export const queries =
{
    getCourses: async () => {
        let db, courses = []
        try {
            db = await connectDB()
            courses = await db.collection(DB_COLLECTION1).find({}).toArray()
            return courses
        } catch (error) {
            errorHandler(error)
        }
        
    },
    getCourse: async (root, { id }) => {
        let db, course
        try {
            db = await connectDB()
            course = await db.collection(DB_COLLECTION1).findOne({_id: ObjectId(id)})
            return course
        } catch (error) {
            errorHandler(error)
        }
    },
    getStudents: async () => {
        let db, students = []
        try {
            db = await connectDB()
            students = await db.collection(DB_COLLECTION2).find({}).toArray()
            return students
        } catch (error) {
            errorHandler(error)
        }
        
    },
    getStudent: async (root, { id }) => {
        let db, student
        try {
            db = await connectDB()
            student = await db.collection(DB_COLLECTION2).findOne({_id: ObjectId(id)})
            return student
        } catch (error) {
            errorHandler(error)
        }
    }
}