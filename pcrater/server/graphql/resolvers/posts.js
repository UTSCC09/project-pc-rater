const Post = require('../../models/Post');
const { UserInputError } = require('apollo-server');
const { validatePostInput, validateUpdateInput } = require('../../util/validators');

function getCurDateInYearMonthDayFormat(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return day + '/' + month + '/' + year;
}

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
        async addPost(_, { name, role, course, title, content, visibility, type }) {
            const { errors, valid } = validatePostInput(name, role, course, 
                title, content, visibility, type);
            
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const createdAt = getCurDateInYearMonthDayFormat();

            const postObj = new Post({
                name, 
                role, 
                course, 
                title, 
                content, 
                visibility,
                type,
                createdAt
            });

            await postObj.save();

            return postObj;
        },

        async updatePost(_, { id, title, content, visibility }) {
            const { errors, valid } = validateUpdateInput(title, content, visibility);
            
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

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