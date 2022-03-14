const Post = require('../../models/Post');
const { UserInputError } = require('apollo-server');
const MongoDb = require('mongodb');
const { validatePostInput } = require('../../util/validators');

module.exports = {

    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async addPost(_, { name, role, course, title, content, visibility }) {
            const { errors, valid } = validatePostInput(name, role, course, 
                title, content, visibility);
            
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const postObj = new Post({
                name, 
                role, 
                course, 
                title, 
                content, 
                visibility
            });

            const res = await postObj.save();

            return {
                id: res._id,
                name: res.name,
                role: res.role,
                course: res.course,
                title: res.title,
                content: res.content,
                visibility: res.visibility
            };
        },

        async updatePost(_, { id, title, content, visibility }) {
            const errors = {};

            await Post.findByIdAndUpdate(id, { title: title,
                content: content, visibility: visibility});
            
            postObj = await Post.findById(id);

            if (!postObj) {
                errors.general = 'Post not found';
                throw new UserInputError('Post not found', { errors });
            }

            return postObj;
        },

        async deletePost(_, { id }) {
            const errors = {};

            const postObj = await Post.findByIdAndDelete(id);

            if (!postObj) {
                errors.general = 'Post not found';
                throw new UserInputError('Post not found', { errors });
            }
            
            return postObj;
        }
    }
};