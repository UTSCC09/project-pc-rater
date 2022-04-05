const Post = require('../../models/Post');
const Course = require('../../models/Course');
let User = require('../../models/User');
const { UserInputError } = require('apollo-server');
const { validatePostInput, validateUpdateInput, validateAddCommentInput } = require('../../util/validators');
const validator = require('validator');


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
        async addPost(_, { username, role, course, title, content, visibility, type }) {
            const { errors, valid } = validatePostInput(validator.escape(username), validator.escape(role), validator.escape(course), 
            validator.escape(title), validator.escape(content), validator.escape(visibility), validator.escape(type));
            
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            let courseObj = await Course.findOne({ "courseCode": validator.escape(course) } ).populate("professors").populate("students").populate("teachingAssistants");
            let userObj = await User.findOne({ "username": validator.escape(username) });
            if(!userObj){
                throw new UserInputError('A user with username ' + username + ' is not found.', {
                    errors: {
                      user_not_found: 'User is not found.'
                    }
                  });
            }else if(!courseObj){
                throw new UserInputError('A course  with course code ' + course + ' is not found.', {
                    errors: {
                      course_not_found: 'Course is not found.'
                    }
                  });
            }
            else if(![...courseObj.students].map(student => student.username).includes(validator.escape(username)) && ![...courseObj.teachingAssistants].map(ta => ta.username).includes(validator.escape(username)) && ![...courseObj.professors].map(prof => prof.username).includes(validator.escape(username))){
                throw new UserInputError('A user with username ' + username + ' is not part of the course.', {
                    errors: {
                      user_already_exists: 'User is not part of the course.'
                    }
                  });
            }

            const createdAt = getCurDateInYearMonthDayFormat();

            const postObj = new Post({
                username: validator.escape(username), 
                role: validator.escape(role), 
                course: validator.escape(course), 
                title: validator.escape(title), 
                content: validator.escape(content), 
                visibility: validator.escape(visibility),
                type: validator.escape(type),
                createdAt,
                upvotes: 0,
                upvotes_list: [],
                comments: []
            });

            await postObj.save();

            return postObj;
        },

        async updatePost(_, { id, title, content, visibility }) {
            const { errors, valid } = validateUpdateInput(validator.escape(title), validator.escape(content), validator.escape(visibility));
            
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            await Post.findByIdAndUpdate(id, { title: validator.escape(title),
                content: validator.escape(content), visibility: validator.escape(visibility)});
            
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
            const { errors, valid } = validateAddCommentInput(validator.escape(content), validator.escape(author), validator.escape(role));
            const postObj = await Post.findById(id);
            if(!postObj){
                errors.general = "post not found";
                throw new UserInputError("Post not found", { errors });
            }

            
            let courseObj = await Course.findOne({ "courseCode": postObj.course } ).populate("professors").populate("students").populate("teachingAssistants");
            let userObj = await User.findOne({ "author": validator.escape(author) });
            if(!userObj){
                throw new UserInputError('A user with username ' + author + ' is not found.', {
                    errors: {
                      user_not_found: 'User is not found.'
                    }
                  });
            }else if(![...courseObj.students].map(student => student.username).includes(validator.escape(author)) && ![...courseObj.teachingAssistants].map(ta => ta.username).includes(validator.escape(author)) && ![...courseObj.professors].map(prof => prof.username).includes(validator.escape(author))){
                throw new UserInputError('A user with username ' + author + ' is not part of the course.', {
                    errors: {
                      user_already_exists: 'User is not part of the course.'
                    }
                  });
            }

            const createdAt = getCurDateInYearMonthDayFormat();
            const newComment = {
                author: validator.escape(author),
                role: validator.escape(role),
                content: validator.escape(content), 
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

            let courseObj = await Course.findOne({ "courseCode": postObj.course } ).populate("professors").populate("students").populate("teachingAssistants");
            let userObj = await User.findOne({ "username": validator.escape(username) });
            if(!userObj){
                throw new UserInputError('A user with username ' + username + ' is not found.', {
                    errors: {
                      user_not_found: 'User is not found.'
                    }
                  });
            }else if(![...courseObj.students].map(student => student.username).includes(validator.escape(username)) && ![...courseObj.teachingAssistants].map(ta => ta.username).includes(validator.escape(username)) && ![...courseObj.professors].map(prof => prof.username).includes(validator.escape(username))){
                throw new UserInputError('A user with username ' + username + ' is not part of the course.', {
                    errors: {
                      user_already_exists: 'User is not part of the course.'
                    }
                  });
            }


            postObj.upvotes = postObj.upvotes + 1;
            postObj.upvotes_list.push({"username": validator.escape(username)});
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

            let courseObj = await Course.findOne({ "courseCode": postObj.course } ).populate("professors").populate("students").populate("teachingAssistants");
            let userObj = await User.findOne({ "username": validator.escape(username) });
            if(!userObj){
                throw new UserInputError('A user with username ' + username + ' is not found.', {
                    errors: {
                      user_not_found: 'User is not found.'
                    }
                  });
            }else if(![...courseObj.students].map(student => student.username).includes(validator.escape(username)) && ![...courseObj.teachingAssistants].map(ta => ta.username).includes(validator.escape(username)) && ![...courseObj.professors].map(prof => prof.username).includes(validator.escape(username))){
                throw new UserInputError('A user with username ' + username + ' is not part of the course.', {
                    errors: {
                      user_already_exists: 'User is not part of the course.'
                    }
                  });
            }


            let commentObj = postObj.comments.find(comment => comment.id === commentId);
            if(!commentObj){
                throw new UserInputError("A comment with comment id" + commentId + " is not found.", {
                    errors: {
                        comment_not_found: "Comment is not found"
                    }
                });
            }
            commentObj.upvotes = commentObj.upvotes + 1;
            commentObj.upvotes_list.push({"username": validator.escape(username)});
            postObj.save();
            return postObj;
        }
    }
};