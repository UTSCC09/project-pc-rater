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
        async getPosts(_, args) {
            try {
                const posts = await Post.find({ "course": args.courseCode });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },

        async getPost(_, args){
            try{
                const postObj = await Post.findById(args.id);
                return postObj;
            }catch(err){
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
                createdAt,
                upvotes: 0,
                upvotes_list: [],
                comments: []
            });

            await postObj.save();

            return postObj;
        },

        async updatePost(_, { id, title, content }) {
            const { errors, valid } = validateUpdateInput(title, content);
            
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            await Post.findByIdAndUpdate(id, { title: title,
                content: content});
            
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
        },
        async addComment(_, { id, content, author, role }){
            const errors = {};
            const postObj = await Post.findById(id);
            if(!postObj){
                errors.general = "post not found";
                throw new UserInputError("Post not found", { errors });
            }
            const createdAt = getCurDateInYearMonthDayFormat();
            const newComment = {
                author,
                role,
                content, 
                createdAt,
                upvotes: 0,
                upvotes_list: []
            };
            postObj.comments = [...postObj.comments, newComment];
            await postObj.save();
            return postObj;
        },
        async increaseUpvotesPost(_, { id, username }){
            const errors = {};
            const postObj = await Post.findById(id);
            if(!postObj){
                errors.general = "post not found";
                throw new UserInputError("Post not found", { errors });
            }
            postObj.upvotes = postObj.upvotes + 1;
            postObj.upvotes_list.push({"username": username});
            postObj.save();
            return postObj;
        },
        async increaseUpvotesComment(_, { postId, commentId, username }){
            const errors = {};
            const postObj = await Post.findById(postId);
            if(!postObj){
                errors.general = "post not found";
                throw new UserInputError("Post not found", { errors });
            }
            let commentObj = postObj.comments.find(comment => comment.id === commentId);
            commentObj.upvotes = commentObj.upvotes + 1;
            commentObj.upvotes_list.push({"username": username});
            postObj.save();
            return postObj;
        }
    }
};