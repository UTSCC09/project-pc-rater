import React, { useState, useEffect, useContext } from 'react';
import './NewClasses.css';
import { IconName } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchBar from '../components/SearchBar';
import ErrorMessage from '../components/ErrorMessage';
import Modal from 'react-bootstrap/Modal';
import { gql, useQuery, useMutation } from '@apollo/client'
import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/CloseButton';
import { AuthContext } from '../context/auth';
import { useNavigate } from "react-router-dom";
import SuccessMessage from '../components/SuccessMessage';

import { FaTimesCircle } from 'react-icons/fa';


const ALL_COURSES = gql `
    query findCoursesByUniversity($university: String!){
        getCourses(university: $university) {
            courseName
            courseCode
            university
        }
    }
`;

const FIND_USER = gql`
    query findUserByUsername($username: String!) {
        findUser(username: $username) {
            username
            institution
        }
    }
`;

const GET_COURSES_OF_STUDENT = gql`
    query getCoursesOfStudentByUsername($username: String!){
        getCoursesOfStudent(username: $username) {
            courseCode
            courseName
            university
        }
    } 
`;

const GET_COURSES_OF_TA = gql`
    query getCoursesOfTAForUser($username: String!){
        getCoursesOfTA(username: $username) {
            courseCode
            courseName
            university
        }
    } 
`;

const GET_COURSES_OF_PROFESSOR = gql`
    query getCoursesOfProfForUser($username: String!){
        getCoursesOfProfessor(username: $username) {
            courseCode
            courseName
            university
        }
    } 
`;

const UPDATE_UNIVERSITY = gql`
    mutation($username: String!, $university: String!) {
        updateUniversity(username: $username, university: $university) {
            username
            institution
        }
    }
`;



const ADD_COURSE = gql`
    mutation addNewCourse($courseName: String!, $courseCode: String!, $university: String!, $semester: String!){
        addCourse(courseName: $courseName, courseCode: $courseCode, university: $university, semester: $semester){
            courseCode
            courseName
        }
    }
`;

const ADD_STUDENT_TO_COURSE = gql`
    mutation addNewStudentToCourse($courseCode: String!, $username: String!) {
        addStudentToCourse(courseCode: $courseCode, username: $username) {
            courseCode
            courseName
        }
    }
`;

const ADD_TA_TO_COURSE = gql`
    mutation addNewTAToCourse($courseCode: String!, $username: String!) {
        addTaToCourse(courseCode: $courseCode, username: $username) {
            courseCode
            courseName
        }
    }
`;

const ADD_PROFESSOR_TO_COURSE = gql`
    mutation addNewProfessorToCourse($courseCode: String!, $username: String!) {
        addProfessorToCourse(courseCode: $courseCode, username: $username) {
            courseCode
            courseName
        }
    }
`;

const DELETE_USER_FROM_CLASS = gql`
    mutation deleteStudentFromClasss($courseCode: String!, $username: String!){
        deleteCourseForUser(courseCode: $courseCode, username: $username){
            courseCode
            courseName
        }
    }
`;


const determineSemester = () => {
    const year = new Date().getFullYear();
    let season = "Fall";
    let month = new Date().getMonth();
    if(month >= 0 && month <= 3){
        season = "Winter";
    }else if(month >= 4 && month <= 7){
        season = "Summer";
    }
    return season + " " + year;
}
    
let current_semester = determineSemester();

const New_Classes = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [classCode, setClassCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [joinAsSelection, SetJoinAsSelection] = useState("student");
    const [classesList, setClassesList] = useState([]);
    const [willCreateNewClass, setWillCreateNewClass] = useState(false);
    const [universityError, setUniversityError] = useState('');
    const [courseNameError, setCourseNameError] = useState('');
    const [searchResultsForCourses, setSearchResultsForCourses]= useState([]);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [show, setShow] = useState(false);
    const [university, setUniversity] = useState("");
    const [universityInputVal, setUniversityInputVal] = useState("");
    const [universitiesJson, setUniversitiesJson] = useState({});



    //This will be used for fetching data from the database
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
        .then((res) => {
            return res.json();
        })
        .then((jsonObj) => {
            setUniversitiesJson(jsonObj);
        })
        .catch((err) =>{
            console.log(err);
        });
    });

    let [ updateUniversity ] = useMutation(UPDATE_UNIVERSITY, {
        refetchQueries: [ FIND_USER ]
    });

    let [ addNewCourse ] = useMutation(ADD_COURSE, {
        refetchQueries: [ ALL_COURSES ]
    });

    let [  addNewStudentToCourse ] = useMutation(ADD_STUDENT_TO_COURSE, {
        refetchQueries: [ GET_COURSES_OF_STUDENT ]
    });
    let [  addNewTAToCourse ] = useMutation(ADD_TA_TO_COURSE, {
        refetchQueries: [ GET_COURSES_OF_TA ]
    });
    let [  addNewProfessorToCourse ] = useMutation(ADD_PROFESSOR_TO_COURSE, {
        refetchQueries: [ GET_COURSES_OF_PROFESSOR ]
    });

    let [ deleteCourseForUser ] = useMutation(DELETE_USER_FROM_CLASS, {
        refetchQueries: [ GET_COURSES_OF_STUDENT, GET_COURSES_OF_TA, GET_COURSES_OF_PROFESSOR ]
    });


    
    let userResult = useQuery(FIND_USER, {variables: { "username": user.username }, skip: !user.username,});
    let allCoursesResult = useQuery(ALL_COURSES, {variables: { "university": university }, skip: !userResult.data});
    let userCoursesResult = useQuery(GET_COURSES_OF_STUDENT, {variables: { "username": user.username }, skip: !user.username});
    let userCoursesResultTA = useQuery(GET_COURSES_OF_TA, {variables: { "username": user.username }, skip: !user.username});
    let userCoursesResultProfessor = useQuery(GET_COURSES_OF_PROFESSOR, {variables: { "username": user.username }, skip: !user.username});
    

    useEffect(() => {
        if(!userResult.loading){
            setUniversity(userResult.data.findUser.institution);
        }
    });

    useEffect(() => {
        if(!userCoursesResult.loading){
            setClassesList(userCoursesResult.data.getCoursesOfStudent);
        }
    }, [userCoursesResult])

    useEffect(() => {
        if(!allCoursesResult.loading && allCoursesResult.data){
            setSearchResultsForCourses(allCoursesResult.data.getCourses);
        }
    }, [allCoursesResult]);


    if(allCoursesResult.loading || userResult.loading || userCoursesResult.loading || userCoursesResultTA.loading || userCoursesResultProfessor.loading){
        return <div>Loading...</div>
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleCreateNewClassClick(){
        if(willCreateNewClass){
            SetJoinAsSelection("student");
        }else{
            SetJoinAsSelection("professor");
        }
        setWillCreateNewClass(!willCreateNewClass);
    }

    const addNewClass = async () => {
        let classObj = allCoursesResult.data.getCourses.find(classElmt => classElmt.courseCode == classCode);
        if(classObj){
            setCourseNameError('Course already exists');
            setShowError(true);
        }else if(courseName == ''){
            setCourseNameError('Course name cannot be empty.');
            setShowError(true);
        }else if(classCode == ''){
            setCourseNameError('Course code cannot be empty.');
            setShowError(true);
        }else{
            setCourseNameError('');
            setUniversityError('');
            setShowError(false);
            let value = await addNewCourse({ variables: { "courseName": courseName, "courseCode": classCode, "university": userResult.data.findUser.institution, "semester": current_semester } });
            addNewProfessorToCourse({ variables: { "courseCode": classCode, "username": user.username } });
            setSuccessMessage("Course added successfully! You have joined the course as a professor.");
            setShowSuccess(true);
            setCourseName('');
            setClassCode('');
        }
    }

    const joinNewClass = () => {
        let classObj = allCoursesResult.data.getCourses.find(classElmt => classElmt.courseCode == classCode);
        let classObj2 = userCoursesResult.data.getCoursesOfStudent.find(classElmt => classElmt.courseCode == classCode);
        let classObj3 = userCoursesResultTA.data.getCoursesOfTA.find(classElmt => classElmt.courseCode == classCode);
        let classObj4 = userCoursesResultProfessor.data.getCoursesOfProfessor.find(classElmt => classElmt.courseCode == classCode);
        if(classObj === undefined){
            setCourseNameError('Course is not found.');
            setShowError(true);
        }else if(classObj2 !== undefined || classObj3 !== undefined || classObj4 !== undefined){
            setCourseNameError("You have already joined the course");
            setShowError(true);
        }
        else{
            setShowError(false);
            setSuccessMessage("You joined the course successfully");
            setShowSuccess(true);
            if(joinAsSelection.toLowerCase() === "student"){
                addNewStudentToCourse({ variables: { "courseCode": classCode, "username": user.username } });
            }else if(joinAsSelection.toLocaleLowerCase() === "ta"){
                addNewTAToCourse({ variables: { "courseCode": classCode, "username": user.username } });
            }else if(joinAsSelection.toLocaleLowerCase() === "professor"){
                addNewProfessorToCourse({ variables: { "courseCode": classCode, "username": user.username } });
            }
        }
    }

    const handleDeleteClass = (courseCode, username) => {
        deleteCourseForUser({ variables: { "courseCode": courseCode, "username": username } })
        setSuccessMessage("Class got deleted successfully");
        setShowSuccess(true);
    }

    function handleUniversityChange(newValue){
        if(newValue){
            let universityObject = universitiesJson.find(elmt => elmt.name.toLowerCase() == newValue.toLowerCase());
            if(universityObject){
                // setUniversity(universityObject.name);
                updateUniversity({ variables: { "username": user.username, "university": universityObject.name } })
                setShow(false);
                setUniversityError('');
            }else{
                setUniversityError("The university you entered does not exist, please try a different one");
                setShowError(true);
                setShow(false);
            }
        }
    }



    return (
        <div className="main">
            <div className="subContainer">
                <h2 className="text-center">{userResult.data.findUser.institution}</h2>
                <p className="text-center" onClick={handleShow}>(Change school)</p>
                {((universityError !== '' || courseNameError !== '') && showError) &&                
                <ErrorMessage errorMessage={universityError === '' ? courseNameError : universityError} setShowError={setShowError} />
                }
                {
                    (showSuccess &&  successMessage !== '') &&
                    <SuccessMessage successMessage={successMessage} setShowSuccess={setShowSuccess} />
                }
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Change schools</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="w-75 px-4">
                            <SearchBar placeholder="Enter university name" setSearchWord ={setUniversityInputVal} data={universitiesJson} attributeToSearchFor="name" />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUniversityChange(universityInputVal)}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div className='justify-content-center'>
                    <Card className='classCard'>
                        <Card.Header style = {{ textAlign: "left", fontWeight: "bold", fontSize: "18px" }}>{current_semester} classes</Card.Header>
                        <ListGroup  variant="flush" className="courses_list" style = {{ textAlign: 'left' }}>
                            {userCoursesResult.data.getCoursesOfStudent.map(classCode => {
                              return <ListGroup.Item> <FaTimesCircle onClick={() => handleDeleteClass(classCode.courseCode, user.username)} className="delete-icon" /> {classCode.courseCode}: {classCode.courseName} - {classCode.university}</ListGroup.Item>  
                            })}

                            {userCoursesResultTA.data.getCoursesOfTA.map(classCode => {
                              return <ListGroup.Item> <FaTimesCircle onClick={() => handleDeleteClass(classCode.courseCode, user.username)} className="delete-icon" /> {classCode.courseCode}: {classCode.courseName} - {classCode.university} <span className='text-secondary'> (TA)</span></ListGroup.Item>  
                            })}

                            {userCoursesResultProfessor.data.getCoursesOfProfessor.map(classCode => {
                              return <ListGroup.Item> <FaTimesCircle onClick={() => handleDeleteClass(classCode.courseCode, user.username)} className="delete-icon" /> {classCode.courseCode}: {classCode.courseName} - {classCode.university} <span className='text-secondary'> (Professor)</span></ListGroup.Item>  
                            })}
                        </ListGroup>
                            
                        <Form className="mt-2">
                            <Form.Check
                             onClick={() => handleCreateNewClassClick()} 
                             style = {{ textAlign: "left", marginLeft: "10px", marginTop: "5px", marginBottom: "10px" }} 
                             label="Create new class? (professors only)" 
                             />
                            <div className="d-flex">
                                {
                                    willCreateNewClass &&
                                    <div className="d-flex w-100">
                                        <Form.Control placeholder="Enter class name" size="lg" className="ml-1 mr-1" onChange={(e) => setCourseName(e.target.value)} /> 
                                        <Form.Control placeholder="Enter class code" size="lg" className="ml-1 mr-1" onChange={(e) => setClassCode(e.target.value)} />
                                    </div>
                                }

                                {
                                    !willCreateNewClass &&
                                    <SearchBar setSearchWord={setClassCode} placeholder = "Enter a class code..." data={allCoursesResult.data.getCourses.map(course => {
                                        let new_elmt = {
                                            "code": course.courseCode
                                        };
                                        return new_elmt;
                                    })} attributeToSearchFor="code" />
                                }
                                
                            </div>
                        </Form>
                        {!willCreateNewClass &&
                        <Dropdown className="text-left mb-1 mt-4 ml-1 w-25">
                            <Dropdown.Toggle id="dropdown-basic">
                                Join as a {joinAsSelection}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => SetJoinAsSelection("student")} href="#/action-1">Student</Dropdown.Item>
                                <Dropdown.Item onClick={() => SetJoinAsSelection("TA")} href="#/action-2">TA</Dropdown.Item>
                                <Dropdown.Item onClick={() => SetJoinAsSelection("professor")} href="#/action-3">Professor</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>  
                        
                                                
                        }       

                        {willCreateNewClass ?
                        <Button className="mt-2 w-100" variant="primary" size="lg" onClick={() => addNewClass()}>
                        Create new class
                        </Button> :
                        <Button className="mt-2 w-100" variant="primary" size="lg" onClick={() => joinNewClass()}>
                        Join new class
                        </Button>
                        }
 
                        <h6 className='browse_classes_title'>Browse current classes</h6>

                    </Card>
                </div>
            </div>
        </div>
    );
};

export default New_Classes;