
module.exports.validateRegisterInput = (
    username,
    firstname,
    lastname,
    institution,
    email,
    password,
    confirmPassword
  ) => {
    const errors = {};
    const validator = require('validator');
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }else if(!validator.isAlphanumeric(username)){
      errors.username = "Username must be alphanumeric";
    }
    if (firstname.trim() === '') {
      errors.firstname = 'Firstname must not be empty';
    }else if(!validator.isAlphanumeric(firstname)){
      errors.firstname = "Firstname must be alphanumeric";
    }
    if (lastname.trim() === '') {
      errors.lastname = 'Lastname must not be empty';
    }else if(!validator.isAlphanumeric(lastname)){
      errors.lastname = 'Lastname must be alphanumeric';
    }
    if (institution.trim() === '') {
      errors.institution = 'Institution must not be empty';
    }
    if (email.trim() === '') {
      errors.email = 'Email must not be empty';
    } else {
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.email = 'Email must be a valid email address';
      }
    }
    if (password === '') {
      errors.password = 'Password must not empty';
    } else if(!validator.isStrongPassword(password)){
      errors.password = 'Password is not strong enough. Password should have at least 8 characters, including at least one lower-case letter, upper-case letter, number and special symobl';
    } 
    else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    } 
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };
  
  module.exports.validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === '') {
      errors.email = 'Email must not be empty';
    }
    if (password.trim() === '') {
      errors.password = 'Password is not strong enough. Password should have at least 8 characters, including at least one lower-case letter, upper-case letter, number and special symobl.';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };

  module.exports.validatePostInput = (username, role, course, title, content, visibility, type) => {
    const errors = {};
    if (username.trim() === '') {
      errors.username = 'username must not be empty';
    }
    if (role.trim() === '') {
      errors.role = 'role must be either Professor, TA, or Student';
    } else if (role.toLowerCase() != 'professor' && 
    role.toLowerCase() != 'ta' && role.toLowerCase() != 'student') {
      errors.role = 'role must be either Professor, TA, or Student';
    }
    if (course.trim() === '') {
      errors.course = 'course must not be empty';
    }
    if (title.trim() === '') {
      errors.title = 'title must not be empty';
    }
    if (content.trim() === '') {
      errors.content = 'content must not be empty';
    }
    if (visibility.trim() === '') {
      errors.visibility = 'visibility must be either public or private';
    } else if (visibility.toLowerCase() != 'public' && 
    visibility.toLowerCase() != 'private') {
      errors.visibility = 'visibility must be either public or private';
    }
    if (type.trim() === '') {
      errors.type = 'type must be either note, poll, or question';
    } else if (type.toLowerCase() != 'note' && 
    type.toLowerCase() != 'poll' && type.toLowerCase() != 'question') {
      errors.type = 'type must be either note, poll, or question';
    }

    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };

  module.exports.validateUpdateInput = (title, content, visibility) => {
    const errors = {};
    if (title.trim() === '') {
      errors.title = 'title must not be empty';
    }
    if (content.trim() === '') {
      errors.content = 'content must not be empty';
    }
    if (visibility.trim() === '') {
      errors.visibility = 'visibility must be either public or private';
    } else if (visibility.toLowerCase() != 'public' && 
    visibility.toLowerCase() != 'private') {
      errors.visibility = 'visibility must be either public or private';
    }
    
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };

  module.exports.validateAddCommentInput = (content, author, role) => {
    const errors = {};
    if (content.trim() === '') {
      errors.content = 'content must not be empty';
    }
    if (author.trim() === '') {
      errors.author = 'author must not be empty';
    }
    if(role.toLowerCase() !== "ta" || role.toLowerCase() !== "professor" || role.toLowerCase() !== "student"){
      errors.role = "role must be either Student, TA or Professor";
    }
    
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };

  module.exports.validateAddCourseInput = (courseName, courseCode, semester, university) => {
    const errors = {};
    if(courseName.trim() === ''){
      errors.courseName = 'courseName must not be empty';
    }
    if(courseCode.trim() === ''){
      errors.courseCode = 'courseCode must not be empty';
    }
    if(semester.trim() === ''){
      errors.semester = 'semester must not be empty';
    }
    if(university.trim() === ''){
      errors.university = 'university must not be empty';
    }

    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };