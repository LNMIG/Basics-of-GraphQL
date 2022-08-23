import dotenv from 'dotenv'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import express from 'express'
import { readFileSync } from 'fs'
import { join } from 'path'
import { resolvers } from './lib/resolvers.js'

dotenv.config()
const isDev = process.env.NODE_ENV.trim() !== 'production'
const app = express()
const port = process.env.PORT || 3000

const typeDefs = readFileSync( join( './', 'lib', 'schema.gql'),'utf-8' )

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors())
app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
}))

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`)
})