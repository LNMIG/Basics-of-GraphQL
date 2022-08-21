import dotenv from 'dotenv'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphqlHTTP } from 'express-graphql'
import express from 'express'
import { readFileSync } from 'fs'
import { join } from 'path'
import { resolvers } from './lib/resolvers.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

const typeDefs = readFileSync( join( './', 'lib', 'schema.gql'),'utf-8' )

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: process.env.NODE_ENV === 'true'
}))

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`)
})