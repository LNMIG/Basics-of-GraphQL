import { mutations } from './mutations.js'
import { queries } from './queries.js'
import { Course } from './types.js'
import { Person } from './types.js'
import { GlobalSearch } from './types.js'

export const resolvers =
{
    Query: queries,
    Mutation: mutations,
    Course,
    Person,
    GlobalSearch
}