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
    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }
    if (firstname.trim() === '') {
      errors.firstname = 'Firstname must not be empty';
    }
    if (lastname.trim() === '') {
      errors.lastname = 'Lastname must not be empty';
    }
    if (institution.trim() === '') {
      errors.institutioln = 'Institution must not be empty';
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
    } else if (password !== confirmPassword) {
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
      errors.password = 'Password must not be empty';
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };

  module.exports.validatePostInput = (name, role, course, title, content, visibility, type) => {
    const errors = {};
    if (name.trim() === '') {
      errors.name = 'name must not be empty';
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

  module.exports.validateUpdateInput = (title, content) => {
    const errors = {};
    if (title.trim() === '') {
      errors.title = 'title must not be empty';
    }
    if (content.trim() === '') {
      errors.content = 'content must not be empty';
    }
    
    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  };