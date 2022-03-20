const Course = require('../../models/Course');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const User = require('../../models/User');
const { findOne } = require('../../models/Course');
const mongoose = require('mongoose');

module.exports = {
    Query: {
        async getCourses(root, args){
            try{
                const courses = await Course.find({"university": args.university});
                return courses;
            } catch(err){
                throw new Error(err);
            }
        },
        async getCoursesOfStudent(root, args){
            try{
                const user = await User.findOne({"username": args.username});
                const all_courses = await Course.find({}).populate("students");
                let student_courses = all_courses.filter(course => course.students.map(student => student.username).includes(args.username));
                return student_courses;
            }catch(err){
                throw new Error(err);
            }
        },
        async getCoursesOfProfessor(root, args){
            try{
                const user = await User.findOne({"username": args.username});
                const all_courses = await Course.find({}).populate("professors");
                let student_courses = all_courses.filter(course => course.professors.map(student => student.username).includes(args.username));
                return student_courses;
            }catch(err){
                throw new Error(err);
            }   
        },
        async getCoursesOfTA(root, args){
            try{
                const user = await User.findOne({"username": args.username});
                const all_courses = await Course.find({}).populate("teachingAssistants");
                let student_courses = all_courses.filter(course => course.teachingAssistants.map(student => student.username).includes(args.username));
                return student_courses;
            }catch(err){
                throw new Error(err);
            }
        },
        async findCourse(courseCode){
            try{
                const course = await Course.findOne(courseCode);
                return course;
            }catch(err){
                throw new Error(err);
            }
        },
    },
    Mutation: {

        async addCourse(_, { courseName, courseCode, semester, university }){
            const course = await Course.findOne({ courseCode });
            if (course) {
              throw new UserInputError('Course code already exists', {
                errors: {
                  courseCode: 'This course code already exists.'
                }
              });
            }

            //temp prof
            //TOOD: Use context to get actual user's _id
            let cur_prof = await User.findOne({_id: "622e7851714d95b5c332ee16"});


            const NewCourse = new Course({
                courseCode,
                courseName,
                semester,
                university,
                professors: [cur_prof],
                teachingAssistants: [],
                students: [],
                createdAt: new Date().toISOString()
            });

            const res = await NewCourse.save();

            return {
                id: res._id,
                courseCode: res.courseCode,
                courseName: res.courseName,
                university: res.university,
                semester: res.semester,
                students: res.students,
                professors: res.professors,
                teachingAssistants: res.teachingAssistants,
                createdAt: res.createdAt,
              };
        },
        async addProfessorToCourse(_, { courseCode, username }){
            let course = await Course.findOne({ courseCode } ).populate("professors").populate("students").populate("teachingAssistants");
            let prof_to_add = await User.findOne({ username });
            if(!prof_to_add){
                throw new UserInputError('A professor with username ' + username + ' is not found.', {
                    errors: {
                      professor_not_found: 'Professor is not found.'
                    }
                  });
            }else if([...course.students].map(student => student.username).includes(username) || [...course.teachingAssistants].map(ta => ta.username).includes(username) || [...course.professors].map(prof => prof.username).includes(username)){
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
                students: res.students,
                professors: res.professors,
                teachingAssistants: res.teachingAssistants,
                createdAt: res.createdAt,
              };
            
        },
        async addStudentToCourse(_, { courseCode, username }){
            let course = await Course.findOne({ courseCode } ).populate("students").populate("teachingAssistants").populate("professors");
            let student_to_add = await User.findOne({ username });
            if(!student_to_add){
                throw new UserInputError('A student with username ' + username + ' is not found.', {
                    errors: {
                      professor_not_found: 'Student is not found.'
                    }
                  });
            }else if([...course.students].map(student => student.username).includes(username) || [...course.teachingAssistants].map(ta => ta.username).includes(username) || [...course.professors].map(prof => prof.username).includes(username)){
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
                semester: res.semester,
                students: res.students,
                professors: res.professors,
                teachingAssistants: res.teachingAssistants,
                createdAt: res.createdAt,
              };
        },
        async addTaToCourse(_, { courseCode, username }){
            let course = await Course.findOne({ courseCode } ).populate("teachingAssistants").populate("students").populate("professors");
            let ta_to_add = await User.findOne({ username });
            if(!course){
                throw new UserInputError('The course ' + courseCode + " is not found.")
            }else if(!ta_to_add){
                throw new UserInputError('A TA with username ' + username + ' is not found.', {
                    errors: {
                      ta_not_found: 'TA is not found.'
                    }
                  });
            }else if([...course.students].map(student => student.username).includes(username) || [...course.teachingAssistants].map(ta => ta.username).includes(username) || [...course.professors].map(prof => prof.username).includes(username)){
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
                students: res.students,
                professors: res.professors,
                teachingAssistants: res.teachingAssistants,
                createdAt: res.createdAt,
              };
        }
    }
};