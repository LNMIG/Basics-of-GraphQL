
const courses = [
    {
        _id: '1001',
        title: 'Mi título 1',
        teacher: 'Mi profesor',
        description: 'describiendo',
        topic: 'web development'
    },
    {
        _id: '1002',
        title: 'Mi título 2',
        teacher: 'Mi profesor',
        description: 'describiendo',
        topic: 'web development'
    }
]

export const resolvers =
{   Query: {
        getCourses: () => { return courses },
        getCourse: (root, args) => { return courses.filter(each => each._id === args.id).pop() }
    }
}



// {
//     hello: () => 'Hola Mundo',
//     saludo: () => 'Hola a todos'
// }