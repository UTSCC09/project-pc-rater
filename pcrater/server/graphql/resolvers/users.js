//credits: https://www.youtube.com/watch?v=71-CtIcmDJQ

const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');

const { SECRET_KEY } = require('../../config');

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
            SECRET_KEY,
        { expiresIn: '24h' }
    );
}

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch (err) {
                throw new Error(err);
            }
        },
        async findUser(root, args) {
            try {
                const user = await User.findOne({ "username": args.username });
                return user;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async login(_, { email, password }) {
            const { errors, valid } = validateLoginInput(email, password);
            
            if (!valid) {
              throw new UserInputError('Errors', { errors });
            }
      
            const user = await User.findOne({ email });
      
            if (!user) {
              errors.general = 'User not found';
              throw new UserInputError('User not found', { errors });
            }
      
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
              errors.general = 'Wrong crendetials';
              throw new UserInputError('Wrong crendetials', { errors });
            }
            
            const token = generateToken(user);
      
            return {
              id: user._id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              institution: user.institution,
              email: user.email,
              password: user.password,
              createdAt: user.createdAt,
              token
            };
        },
        async register(_, { username, firstname, lastname, institution, email, password, confirmPassword }) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(
              username,
              firstname,
              lastname,
              institution,
              email,
              password,
              confirmPassword
            );
            if (!valid) {
              throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ email });
            if (user) {
              throw new UserInputError('Email is taken', {
                errors: {
                  username: 'This email is taken'
                }
              });
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);
      
            const newUser = new User({
              username,
              firstname,
              lastname,
              institution,
              email,
              password,
              createdAt: new Date().toISOString()
            });
            
            const res = await newUser.save();
            
            const token = generateToken(res);
            
            return {
              id: res._id,
              username: res.username,
              firstname: res.firstname,
              lastname: res.lastname,
              institution: res.institution,
              email: res.email,
              password: res.password,
              createdAt: res.createdAt,
              token
            };
        }
    }
}