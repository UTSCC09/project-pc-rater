const Course = require('../../models/Course');
const { UserInputError } = require('apollo-server');
const uuid = require("uuid");
const { validateAddCourseInput } = require('../../util/validators');
const User = require('../../models/User');
const { findOne } = require('../../models/Course');
const mongoose = require('mongoose');
const validator = require('validator');

module.exports = {
    Query: {
        async getCourses(root, args, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            try{
                const courses = await Course.find({"university": args.university});
                return courses;
            } catch(err){
                throw new Error(err);
            }
        },
        async getCoursesOfStudent(root, args, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            try{
                const user = await User.findOne({"username": args.username});
                const all_courses = await Course.find({}).populate("students");
                let student_courses = all_courses.filter(course => course.students.map(student => student.username).includes(args.username));
                return student_courses;
            }catch(err){
                throw new Error(err);
            }
        },
        async getCoursesOfProfessor(root, args, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            try{
                const user = await User.findOne({"username": args.username});
                const all_courses = await Course.find({}).populate("professors");
                let student_courses = all_courses.filter(course => course.professors.map(student => student.username).includes(args.username));
                return student_courses;
            }catch(err){
                throw new Error(err);
            }   
        },
        async getCoursesOfTA(root, args, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            try{
                const user = await User.findOne({"username": args.username});
                const all_courses = await Course.find({}).populate("teachingAssistants");
                let student_courses = all_courses.filter(course => course.teachingAssistants.map(student => student.username).includes(args.username));
                return student_courses;
            }catch(err){
                throw new Error(err);
            }
        },
        async findCourse(root, args, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            try{
                const course = await Course.findOne({"courseCode": args.courseCode}).populate("students").populate("teachingAssistants").populate("professors");
                return course;
            }catch(err){
                throw new Error(err);
            }
        },
    },
    Mutation: {

        async addCourse(_, { courseName, courseCode, semester, university }, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            const course = await Course.findOne({ "courseCode": validator.escape(courseCode) });
            if (course) {
              throw new UserInputError('Course code already exists', {
                errors: {
                  courseCode: 'This course code already exists.'
                }
              });
            }

            const { errors, valid } = validateAddCourseInput(courseName, courseCode, semester, university);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const NewCourse = new Course({
                courseCode,
                courseName,
                semester,
                university,
                usersInRoom: [],
                professors: [],
                teachingAssistants: [],
                students: [],
                roomID: uuid.v4(),
                createdAt: new Date().toISOString()
            });

            const res = await NewCourse.save();

            return {
                id: res._id,
                courseCode: res.courseCode,
                courseName: res.courseName,
                university: res.university,
                semester: res.semester,
                roomID: res.roomID,
                usersInRoom: res.usersInRoom,
                students: res.students,
                professors: res.professors,
                teachingAssistants: res.teachingAssistants,
                createdAt: res.createdAt,
              };
        },
        async addProfessorToCourse(_, { courseCode, username }, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            let course = await Course.findOne({ "courseCode": validator.escape(courseCode) } ).populate("professors").populate("students").populate("teachingAssistants");
            let prof_to_add = await User.findOne({ "username": validator.escape(username) });
            if(!prof_to_add){
                throw new UserInputError('A professor with username ' + username + ' is not found.', {
                    errors: {
                      professor_not_found: 'Professor is not found.'
                    }
                  });
            }else if(!course){
                throw new UserInputError('A course with course code ' + courseCode + ' is not found.', {
                    errors: {
                      course_not_found: 'Course is not found.'
                    }
                  });
            }else if([...course.students].map(student => student.username).includes(validator.escape(username)) || [...course.teachingAssistants].map(ta => ta.username).includes(validator.escape(username)) || [...course.professors].map(prof => prof.username).includes(validator.escape(username))){
                throw new UserInputError('A professor with username ' + username + ' already exists.', {
                    errors: {
                      professor_not_found: 'Professor already exists.'
                    }
                  });
            }
            let new_profs = [...course.professors, prof_to_add];
            course.professors = new_profs;
            const res = await course.save();

            return {
                id: res._id,
                courseCode: res.courseCode,
                courseName: res.courseName,
                semester: res.semester,
                roomID: res.roomID,
                usersInRoom: res.usersInRoom,
                students: res.students,
                professors: res.professors,
                teachingAssistants: res.teachingAssistants,
                createdAt: res.createdAt,
              };
            
        },
        async addStudentToCourse(_, { courseCode, username }, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            let course = await Course.findOne({ "courseCode": validator.escape(courseCode) } ).populate("students").populate("teachingAssistants").populate("professors");
            let student_to_add = await User.findOne({ "username": validator.escape(username) });
            if(!student_to_add){
                throw new UserInputError('A student with username ' + username + ' is not found.', {
                    errors: {
                      professor_not_found: 'Student is not found.'
                    }
                  });
            }else if(!course){
                throw new UserInputError('A course with course code ' + courseCode + ' is not found.', {
                    errors: {
                      course_not_found: 'Course is not found.'
                    }
                  });
            }else if([...course.students].map(student => student.username).includes(validator.escape(username)) || [...course.teachingAssistants].map(ta => ta.username).includes(validator.escape(username)) || [...course.professors].map(prof => prof.username).includes(validator.escape(username))){
                throw new UserInputError('A student with username ' + username + ' already exists.', {
                    errors: {
                      student_not_found: 'Student already exists.'
                    }
                  });
            }
            let new_students = [...course.students, student_to_add];
            course.students = new_students;
            const res = await course.save();

            return {
                id: res._id,
                courseCode: res.courseCode,
                courseName: res.courseName,
                roomID: res.roomID,
                semester: res.semester,
                usersInRoom: res.usersInRoom,
                students: res.students,
                professors: res.professors,
                teachingAssistants: res.teachingAssistants,
                createdAt: res.createdAt,
              };
        },
        async addTaToCourse(_, { courseCode, username }, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            let course = await Course.findOne({ "courseCode": validator.escape(courseCode) } ).populate("teachingAssistants").populate("students").populate("professors");
            let ta_to_add = await User.findOne({ "username": validator.escape(username) });
            if(!course){
                throw new UserInputError('The course ' + courseCode + " is not found.");
            }else if(!ta_to_add){
                throw new UserInputError('A TA with username ' + username + ' is not found.', {
                    errors: {
                      ta_not_found: 'TA is not found.'
                    }
                  });
            }else if([...course.students].map(student => student.username).includes(validator.escape(username)) || [...course.teachingAssistants].map(ta => ta.username).includes(validator.escape(username)) || [...course.professors].map(prof => prof.username).includes(validator.escape(username))){
                throw new UserInputError('A TA with username ' + username + ' already exists.', {
                    errors: {
                      student_not_found: 'TA already exists.'
                    }
                  });
            }
            let new_tas = [...course.teachingAssistants, ta_to_add];
            course.teachingAssistants = new_tas;
            const res = await course.save();

            return {
                id: res._id,
                courseCode: res.courseCode,
                courseName: res.courseName,
                semester: res.semester,
                roomID: res.roomID,
                usersInRoom: res.usersInRoom,
                students: res.students,
                professors: res.professors,
                teachingAssistants: res.teachingAssistants,
                createdAt: res.createdAt,
              };
        },
        async addUserToRoomForCourse(_, { username, courseCode }, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            let course = await Course.findOne({ "courseCode": validator.escape(courseCode) } ).populate("teachingAssistants").populate("students").populate("professors");
            if(!course){
                throw new UserInputError('The course ' + courseCode + " is not found.");
            }else if(!course.students.map(student => student.username).includes(validator.escape(validator.escape(username))) && !course.teachingAssistants.map(ta => ta.username).includes(validator.escape(username)) && !course.professors.map(prof => prof.username).includes(validator.escape(username))){
                throw new UserInputError("The user " + username + " is not part of the course " + courseCode);
            }else if(course.usersInRoom.includes(validator.escape(username))){
                throw new UserInputError("The user " + username + " is already in the course's room of " + courseCode + ".");
            }else{
                course.usersInRoom.push(validator.escape(username));
                const res = await course.save();
                return {
                    id: res._id,
                    courseCode: res.courseCode,
                    courseName: res.courseName,
                    semester: res.semester,
                    roomID: res.roomID,
                    usersInRoom: res.usersInRoom,
                    students: res.students,
                    professors: res.professors,
                    teachingAssistants: res.teachingAssistants,
                    createdAt: res.createdAt,
                  };
            }
        },
        async deleteUserFromCourseRoom(_, { username, courseCode }, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            let course = await Course.findOne({ "courseCode": validator.escape(courseCode) } ).populate("teachingAssistants").populate("students").populate("professors");
            if(!course){
                throw new UserInputError('The course ' + courseCode + " is not found.");
            }else if(!course.students.map(student => student.username).includes(validator.escape(username)) && !course.teachingAssistants.map(ta => ta.username).includes(validator.escape(username)) && !course.professors.map(prof => prof.username).includes(validator.escape(username))){
                throw new UserInputError("The user " + username + " is not part of the course " + courseCode);
            }else if(!course.usersInRoom.includes(username)){
                throw new UserInputError("The user " + username + " is not part of the room for the course " + courseCode + ".");
            }else{
                let index = course.usersInRoom.findIndex(user => user.username === validator.escape(username));;
                course.usersInRoom.splice(index, 1);
                const res = await course.save();
                return {
                    id: res._id,
                    courseCode: res.courseCode,
                    courseName: res.courseName,
                    semester: res.semester,
                    roomID: res.roomID,
                    usersInRoom: res.usersInRoom,
                    students: res.students,
                    professors: res.professors,
                    teachingAssistants: res.teachingAssistants,
                    createdAt: res.createdAt,
                  };
            } 
        },
        async deleteCourseForUser(_, { courseCode, username }, context){
            if(!context.token){
                let err = new Error("Unauthorized user");
                err.code = 401;
                throw err;
            }
            let course = await Course.findOne({ "courseCode": validator.escape(courseCode) } ).populate("teachingAssistants").populate("students").populate("professors");
            if(!course){
                throw new UserInputError('The course ' + courseCode + " is not found.");
            }else if(!course.students.map(student => student.username).includes(validator.escape(username)) && !course.teachingAssistants.map(ta => ta.username).includes(validator.escape(username)) && !course.professors.map(prof => prof.username).includes(validator.escape(username))){
                throw new UserInputError("The user " + username + " is not part of the course " + courseCode);
            }else{
                if(course.students.map(student => student.username).includes(validator.escape(username))){
                    let index = course.students.findIndex(student => student.username === validator.escape(username));
                    course.students.splice(index, 1);
                }else if(course.teachingAssistants.map(ta => ta.username).includes(validator.escape(username))){
                    let index = course.teachingAssistants.findIndex(ta => ta.username === validator.escape(username));
                    course.teachingAssistants.splice(index, 1);
                }else{
                    let index = course.professors.findIndex(professor => professor.username === validator.escape(username));
                    course.professors.splice(index, 1);
                }
                const res = await course.save();
                return {
                    id: res._id,
                    courseCode: res.courseCode,
                    courseName: res.courseName,
                    semester: res.semester,
                    roomID: res.roomID,
                    usersInRoom: res.usersInRoom,
                    students: res.students,
                    professors: res.professors,
                    teachingAssistants: res.teachingAssistants,
                    createdAt: res.createdAt,
                  };
            } 

        }
    }
};