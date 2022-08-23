import connectDB from './db.js'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { errorHandler } from './errorHandler.js'

dotenv.config()
const {DB_COLLECTION1, DB_COLLECTION2} = process.env

export const mutations =
{   
    createCourse: async (root, { input }) => {
        const newInput = {
            title: input.title,
            teacher: input.teacher || '',
            description: input.description,
            topic: input.topic || ''
        }
        
        let db, newCourse, newCourseId
        try {
            db = await connectDB()
            newCourseId = await db.collection(DB_COLLECTION1).insertOne(newInput)
            newCourse = await db.collection(DB_COLLECTION1).findOne( {_id: ObjectId(newCourseId.insertedId)} )
            return newCourse
        } catch (error) {
            errorHandler(error)
        }
    },
    createPerson: async (root, { input }) => {
        let db, newStudent, newStudentId
        try {
            db = await connectDB()
            newStudentId = await db.collection(DB_COLLECTION2).insertOne(input)
            newStudent = await db.collection(DB_COLLECTION2).findOne( {_id: ObjectId(newStudentId.insertedId)} )
            return newStudent
        } catch (error) {
            errorHandler(error)
        }
    },
    editCourse: async (root, {id, input }) => {
        let db, editedCourse
        try {
            db = await connectDB()
            await db.collection(DB_COLLECTION1).updateOne({_id: ObjectId(id)}, {$set: input})
            editedCourse = await db.collection(DB_COLLECTION1).findOne( {_id: ObjectId(id)} )
            return editedCourse
        } catch (error) {
            errorHandler(error)
        }
    },
    editPerson: async (root, {id, input }) => {
        let db, editedStudent
        try {
            db = await connectDB()
            await db.collection(DB_COLLECTION2).updateOne({_id: ObjectId(id)}, {$set: input})
            editedStudent = await db.collection(DB_COLLECTION2).findOne( {_id: ObjectId(id)} )
            return editedStudent
        } catch (error) {
            errorHandler(error)
        }
    },
    removeStudent: async (root,{ id }) => {
        let db, remainingStudents
        try {
            db = await connectDB()
            await db.collection(DB_COLLECTION2).deleteOne({_id: ObjectId(id)})
            remainingStudents = await db.collection(DB_COLLECTION2).find({}).toArray()
            return remainingStudents
        } catch (error) {
            errorHandler(error)
        }
    },
    addPeople: async (roo, { courseId, personId }) => {
        let db, person, course
        try {
            db = await connectDB()
            course = await db.collection(DB_COLLECTION1).findOne({_id: ObjectId(courseId)})
            person = await db.collection(DB_COLLECTION2).findOne({_id: ObjectId(personId)})
            
            if(!course || !person) return
            await db.collection(DB_COLLECTION1).updateOne(
                {_id: ObjectId(courseId)},
                {$addToSet: {people: ObjectId(personId)}}
                )
            return course
        } catch (error) {
            errorHandler(error)
        }
    }
}