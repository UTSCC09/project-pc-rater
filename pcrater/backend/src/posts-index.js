const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const posts = [
    {
        id: 'posts-1',
        name: 'moh',
        role: 'student',
        class: 'CSCD01',
        title: 'Exam Help',
        content: 'What content should we study',
        visibility: 'private',
    },
    {
        id: 'posts-2',
        name: 'Lucy',
        role: 'TA',
        class: 'CSCC09',
        title: 'A1 confusion',
        content: 'What do we do for security',
        visibility: 'public',
    },
  ];

const resolvers = {
  Query: {
    posts: () => posts,
  },

  Mutation: {
    addPost: (parent, args) => {

    let idCount = posts.length;

       const post = {
        id: `post-${idCount++}`,
        description: args.description,
        name: args.name,
        role: args.role,
        class: args.class,
        title: args.title,
        content: args.content,
        visibility: args.visibility,
      };
      posts.push(post);
      return post;
    }
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});