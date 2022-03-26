import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import {gql, useMutation, useQuery} from "@apollo/client";
import CreatePost from './CreatePost';
import ShowPosts from './ShowPosts';
import SearchBar from '../components/SearchBar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import { FaTelegramPlane } from "react-icons/fa";
import Post from './Post';
import { AuthContext } from '../context/auth';
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";




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

const FIND_COURSE = gql`
    query findCourseByCourseCode($courseCode: String!){
        findCourse(courseCode: $courseCode) {
            courseCode
            courseName
            university
            students {
                username
            }
            teachingAssistants {
                username
            }
            professors {
                username
            }
        }
    }
`;

const GET_POSTS = gql`
query findPosts($courseCode: String!) {
    getPosts(courseCode: $courseCode) {
        name
        role
        course
        title
        content
        visibility
        type
        createdAt
    }
}`;

const PostsNavBar  = ({ setFilteredData, setRole, postsData, setCreateOrShow, selectedCourse, setSelectedCourse }) => {
    const { user } = useContext(AuthContext);
    const [ searchWordVal, setSearchWordVal ] = useState(""); 
  
    let userCoursesResult = useQuery(GET_COURSES_OF_STUDENT, {variables: { "username": user.username }, skip: !user.username});
    let userCoursesResultTA = useQuery(GET_COURSES_OF_TA, {variables: { "username": user.username }, skip: !user.username});
    let userCoursesResultProfessor = useQuery(GET_COURSES_OF_PROFESSOR, {variables: { "username": user.username }, skip: !user.username});
    let currentCourseResult = useQuery(FIND_COURSE, { variables: { "courseCode": selectedCourse }, skip: !selectedCourse } );


    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setSearchWordVal(searchWord);
        const newFilter = postsData.filter((value) => {
          return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData(postsData);
        } else {
            setFilteredData(newFilter);
        }
    };

    useEffect(() => {
        if(userCoursesResult.data !== undefined && userCoursesResultTA.data !== undefined && userCoursesResultProfessor.data !== undefined && selectedCourse === ""){
            if(userCoursesResult.data.getCoursesOfStudent.concat(!userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor).length > 0){
                setSelectedCourse(userCoursesResult.data.getCoursesOfStudent.concat(userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor)[0].courseCode);
            }
        }
    }, [userCoursesResult]);


    useEffect(() => {
        if(userCoursesResult.data !== undefined && userCoursesResultTA.data !== undefined && userCoursesResultProfessor.data !== undefined && selectedCourse === ""){
            if(userCoursesResult.data.getCoursesOfStudent.concat(!userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor).length > 0){
                setSelectedCourse(userCoursesResult.data.getCoursesOfStudent.concat(userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor)[0].courseCode);
            }
        }
    }, [userCoursesResultTA]);

    
    useEffect(() => {
        if(userCoursesResult.data !== undefined && userCoursesResultTA.data !== undefined && userCoursesResultProfessor.data !== undefined && selectedCourse === ""){
            if(userCoursesResult.data.getCoursesOfStudent.concat(!userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor).length > 0){
                setSelectedCourse(userCoursesResult.data.getCoursesOfStudent.concat(userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor)[0].courseCode);
            }
        }
    }, [userCoursesResultProfessor]);

    useEffect(() => {
        if(selectedCourse !== ""){
            setFilteredData(postsData);
        }
    }, [selectedCourse]);

    if(currentCourseResult.loading || userCoursesResult.loading || userCoursesResultTA.loading || userCoursesResultProfessor.loading){
        return <div>Loading...</div>
    }

    if(currentCourseResult.data !== undefined && currentCourseResult.data.findCourse.students.map(student => student.username).includes(user.username)){
        setRole("Student");
    }else if(currentCourseResult.data !== undefined && currentCourseResult.data.findCourse.teachingAssistants.map(ta => ta.username).includes(user.username)){
        setRole("TA");
    }else if(currentCourseResult.data !== undefined && currentCourseResult.data.findCourse.professors.map(prof => prof.username).includes(user.username)){
        setRole("Professor");
    }

 
    return (
        <Card style = {{ marginLeft: "20px", marginTop: "10px", width: "400px" }}>
            <Card.Header>
                <div style = {{ display: "flex" }}>
                    <div style  = {{ marginTop: "5px", marginRight: "3px", fontWeight: "bold" }}>
                        Showing posts for  
                    </div>
                    <Dropdown style={{ textAlign: "left", marginBottom: "5px", marginLeft: "5px", width: "30%", height: "40%", justifyContent: "center", alignItems: "center", alignContent: 'center'  }}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {selectedCourse}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {userCoursesResult.data.getCoursesOfStudent.map(course => 
                                <Dropdown.Item onClick={() => {
                                    setSelectedCourse(course.courseCode);
                                    setCreateOrShow(true);
                                }}>{course.courseCode} : {course.courseName}</Dropdown.Item>    
                            )}
                            
                            {userCoursesResultTA.data.getCoursesOfTA.map(course => 
                                <Dropdown.Item onClick={() => {   
                                    setSelectedCourse(course.courseCode);
                                    setCreateOrShow(true);
                                }}>
                                {course.courseCode} : {course.courseName} <span style={{ color: "grey" }}> (TA)</span></Dropdown.Item>    
                            )}

                            {userCoursesResultProfessor.data.getCoursesOfProfessor.map(course => 
                                <Dropdown.Item onClick={() => {
                                    setSelectedCourse(course.courseCode);
                                    setCreateOrShow(true);
                                }}>{course.courseCode} : {course.courseName} <span style={{ color: "grey" }}> (Prof)</span></Dropdown.Item>    
                            )}
                        </Dropdown.Menu>
                        
                    </Dropdown>  
                </div>

                <div style = {{ display: "flex" }}>
                    {/* <Button onClick={() => setCreateOrShow(true)} size="sm" style={{ height: "50%", width: "25%", marginTop: "10px" }}><FaTelegramPlane /> New Post</Button> */}
                    {/* <SearchBar placeholder="Search post..." setSearchWord={setSearchWordVal} data={postsData.map(post => {
                        let new_elemt = {
                            "title": post.title
                        };
                        return new_elemt;
                    })} attributeToSearchFor="title" /> */}
                    <Form style={{ display: "flex", verticalAlign: "midde", alignItems: "center" }}>
                        <Button onClick={() => setCreateOrShow(true)} size="sm" style={{ height: "50%", width: "30%" }}><FaTelegramPlane /> New Post</Button>
                        <Form.Control onChange={handleFilter} style={{ height: "50%" }} placeholder="Search for post..." />
                        <FaSearch style={{ width: "40%", height: "45%", backgroundColor: "white" }} />
                    </Form>
                </div>
            </Card.Header>
        </Card>
    )
}

const Posts = () => {

    const [ createOrShow, setCreateOrShow ] = useState(true);
    const [ selectedCourse, setSelectedCourse ] = useState("");
    const [ role, setRole ] = useState("Student");
    const [ post, setPost ] = useState({});
    const [filteredData, setFilteredData] = useState("");



    let allPostsResult = useQuery(GET_POSTS, { variables: { "courseCode": selectedCourse } });
    if(allPostsResult.loading){
        return <div>Loading...</div>
    }


    return (
        <div style = {{ display: "flex" }}>
            <div>
                <PostsNavBar setFilteredData={setFilteredData} setRole={setRole} postsData={allPostsResult.data.getPosts} setCreateOrShow={setCreateOrShow} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
                <ShowPosts filteredData={filteredData} postsData={allPostsResult.data.getPosts} setCreateOrShow={setCreateOrShow} selectedCourse={selectedCourse} currentPost={post} setPost={setPost} />
            </div>
            
            {createOrShow ?
                <CreatePost role={role} selectedCourse={selectedCourse}  /> :
                <Post role={role} post={post} />
            }

        </div>
    )
}

export default Posts;