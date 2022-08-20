import { graphql, buildSchema } from 'graphql'

// definir esquema
let schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// Configurar resolvers
let rootValue = { hello: () => 'Hola Mundo' };

let source = '{ hello }';

//ejecutar Query 'hello'
graphql({schema, source, rootValue}).then((data) => { console.log(data)});