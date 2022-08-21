import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()
const { DB_USER, DB_HOST, DB_PORT, DB_NAME } = process.env

let connection
const mongoURL = `${DB_USER}://${DB_HOST}:${DB_PORT}/${DB_NAME}`

async function connectDB () {
    if(connection) return connection //para no volverla a definir

    connection = new Promise(async(resolve,reject) => {
        try {
            let dbConnection
            let client
            //creo un nuevo MongoClient
            client = new MongoClient(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
            //conecto el cliente al server
            await client.connect()
            //conecto con la base de datos
            dbConnection = client.db(DB_NAME)
            //resuelvo con la dbConnection
            resolve(dbConnection)
        } catch (error) {
            console.error('Error happened:', error)
            process.exit(1)
        }
    })
    return connection
}

export default connectDB