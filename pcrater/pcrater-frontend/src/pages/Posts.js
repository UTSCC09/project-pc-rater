import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from "react-bootstrap/Form";
import { FaTelegramPlane, FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth';
import CreatePost from './CreatePost';
import Post from './Post';
import './Posts.css';
import ShowPosts from './ShowPosts';
import ViewPollResults from './ViewPoll';

const ADD_USER_TO_ROOM_FOR_COURSE = gql`
    mutation($username: String!, $courseCode: String!){
        addUserToRoomForCourse(username: $username, courseCode: $courseCode){
            courseCode
            courseName
            usersInRoom
        }
    }
`; 


const CREATE_POST = gql`
    mutation createPost ($username: String!, $role: String!, 
    $course: String!, $title: String!, $content: String!, 
    $visibility: String!, $type: String!) {
        addPost(
            username: $username, 
            role: $role, 
            course: $course,
            title: $title,
            content: $content, 
            visibility: $visibility,
            type: $type
        ) {
            username
            role
            course
            title
            content
            visibility
            type
            createdAt
        }
}`;

const GET_COURSES_OF_STUDENT = gql`
    query getCoursesOfStudentByUsername($username: String!){
        getCoursesOfStudent(username: $username) {
            courseCode
            courseName
            university
            roomID
        }
    } 
`;

const GET_COURSES_OF_TA = gql`
    query getCoursesOfTAForUser($username: String!){
        getCoursesOfTA(username: $username) {
            courseCode
            courseName
            university
            roomID
        }
    } 
`;

const GET_COURSES_OF_PROFESSOR = gql`
    query getCoursesOfProfForUser($username: String!){
        getCoursesOfProfessor(username: $username) {
            courseCode
            courseName
            university
            roomID
        }
    } 
`;

const FIND_COURSE = gql`
    query findCourseByCourseCode($courseCode: String!){
        findCourse(courseCode: $courseCode) {
            courseCode
            courseName
            university
            roomID
            usersInRoom
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
        id
        username
        role
        course
        title
        content
        visibility
        type
        createdAt
        poll_options {
            users
            option
            numVotes
        }
        upvotes
        upvotes_list {
            username
        }
        comments{
            id
            author
            role
            content
            createdAt
            upvotes
            upvotes_list{
                username
            }
        }
    }
}`;


//Select course to show the posts for, serach bar for filtering, video calls icon
const PostsNavBar  = ({ setIsSearching, setFilteredData, setRole, postsData, setCreateOrShow, selectedCourse, setSelectedCourse }) => {
    const { user } = useContext(AuthContext);
    const [ searchWordVal, setSearchWordVal ] = useState(""); 
    const navigate = useNavigate();
    let userCoursesResult = useQuery(GET_COURSES_OF_STUDENT, {variables: { "username": user.username }, skip: !user.username});
    let userCoursesResultTA = useQuery(GET_COURSES_OF_TA, {variables: { "username": user.username }, skip: !user.username});
    let userCoursesResultProfessor = useQuery(GET_COURSES_OF_PROFESSOR, {variables: { "username": user.username }, skip: !user.username});
    let currentCourseResult = useQuery(FIND_COURSE, { pollInterval: 2000, variables: { "courseCode": selectedCourse }, skip: !selectedCourse } );

    let [ addUserToRoomForCourse ] = useMutation(ADD_USER_TO_ROOM_FOR_COURSE, {
        refetchQueries: () => [{ query: FIND_COURSE, variables: {"courseCode": selectedCourse} }]
    });

    const handleVideoIconClick = () => {
        let id =  currentCourseResult.data.findCourse.roomID;
        navigate('/video', { state: { id: id, selectedCourse: selectedCourse } });
    };

    const handleFilter = (event) => {
        event.preventDefault();
        const searchWord = event.target.value;
        setSearchWordVal(searchWord);
        const newFilter = postsData.filter((value) => {
          return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setIsSearching(false);
            setFilteredData(postsData);
        } else {
            setIsSearching(true);
            setFilteredData(newFilter);
        }
    };

    useEffect(() => {
        if(userCoursesResult.data !== undefined && userCoursesResultTA.data !== undefined && userCoursesResultProfessor.data !== undefined && selectedCourse === ""){
            if(userCoursesResult.data.getCoursesOfStudent.concat(userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor).length > 0){
                setSelectedCourse(userCoursesResult.data.getCoursesOfStudent.concat(userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor)[0].courseCode);
            }
        }
    }, [userCoursesResult]);


    useEffect(() => {
        if(userCoursesResult.data !== undefined && userCoursesResultTA.data !== undefined && userCoursesResultProfessor.data !== undefined && selectedCourse === ""){
            if(userCoursesResult.data.getCoursesOfStudent.concat(userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor).length > 0){
                setSelectedCourse(userCoursesResult.data.getCoursesOfStudent.concat(userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor)[0].courseCode);
            }
        }
    }, [userCoursesResultTA]);

    
    useEffect(() => {
        if(userCoursesResult.data !== undefined && userCoursesResultTA.data !== undefined && userCoursesResultProfessor.data !== undefined && selectedCourse === ""){
            if(userCoursesResult.data.getCoursesOfStudent.concat(userCoursesResultTA.data.getCoursesOfTA).concat(userCoursesResultProfessor.data.getCoursesOfProfessor).length > 0){
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
        <Card className="posts_navbar_card">
            {selectedCourse !== '' ?

            <Card.Header>
                <div className='d-flex'>
                    <div className="showing_posts_text">
                        Showing posts for  
                    </div>
                    <Dropdown className="select_course_dropdown">
                        <Dropdown.Toggle id="dropdown-basic">
                            {selectedCourse}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {userCoursesResult.data.getCoursesOfStudent.map(course => 
                                <Dropdown.Item key={course.courseCode} onClick={() => {
                                    setSelectedCourse(course.courseCode);
                                    setCreateOrShow(true);
                                }}>{course.courseCode} : {course.courseName}</Dropdown.Item>    
                            )}
                            
                            {userCoursesResultTA.data.getCoursesOfTA.map(course => 
                                <Dropdown.Item onClick={() => {   
                                    setSelectedCourse(course.courseCode);
                                    setCreateOrShow(true);
                                }}>
                                {course.courseCode} : {course.courseName} <span className='text-secondary'> (TA)</span></Dropdown.Item>    
                            )}

                            {userCoursesResultProfessor.data.getCoursesOfProfessor.map(course => 
                                <Dropdown.Item key={course.courseCode} onClick={() => {
                                    setSelectedCourse(course.courseCode);
                                    setCreateOrShow(true);
                                }}>{course.courseCode} : {course.courseName} <span className='text-secondary'> (Prof)</span></Dropdown.Item>    
                            )}
                        </Dropdown.Menu>

                        
                    </Dropdown>  
                    
      
                    <FaVideo onClick={() => handleVideoIconClick()} className="ml-3 mt-1 fa_video_icon" size={25} />
                </div>

                <div style = {{ display: "flex", height: "60px" }}>
                    <Form className="search_post_form" onSubmit={(e) => e.preventDefault()}>
                        <Button className="new_post_btn" onClick={() => setCreateOrShow(true)} size="sm"><FaTelegramPlane /> New Post</Button>
                        <Form.Control onChange={handleFilter} className="h-50" placeholder="Search for post..." />
                    </Form>
                </div>
            </Card.Header> :
            <div></div>
        }
        </Card>

    )
}

const Posts = () => {

    const [ createOrShow, setCreateOrShow ] = useState(true);
    const [ selectedCourse, setSelectedCourse ] = useState("");
    const [ role, setRole ] = useState("Student");
    const [ post, setPost ] = useState({});
    const [filteredData, setFilteredData] = useState("");
    const [ isSearching, setIsSearching ] = useState(false);
    const [ showError, setShowError ] = useState(false);


    let allPostsResult = useQuery(GET_POSTS, { variables: { "courseCode": selectedCourse }, pollInterval: 2000});
    
    const [ createPostFunction ] = useMutation(CREATE_POST, { refetchQueries: [ GET_POSTS ] });
    

    if(allPostsResult.loading){
        return <div>Loading...</div>
    }


    return (
        <div style = {{ display: "flex" }}>
            <div>
                <PostsNavBar setIsSearching={setIsSearching} setFilteredData={setFilteredData} setRole={setRole} postsData={allPostsResult.data ? allPostsResult.data.getPosts : []} setCreateOrShow={setCreateOrShow} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
                <ShowPosts isSearching={isSearching} filteredData={filteredData} postsData={allPostsResult.data ? allPostsResult.data.getPosts : []} setCreateOrShow={setCreateOrShow} selectedCourse={selectedCourse} currentPost={post} setPost={setPost} />
            </div>
            
            {selectedCourse === '' &&
                <div>Make sure to enroll in at least on course before using the forum.</div>
            }

            {(createOrShow && selectedCourse !== '') &&
                <CreatePost setIsSearching={setIsSearching} createPostFunction={createPostFunction} role={role} selectedCourse={selectedCourse}  />
            }

            {(!createOrShow && selectedCourse !== '' && post.type === 'Question') &&
                <Post role={role} post={post} />
            }

            {(!createOrShow && selectedCourse !== '' && post.type === 'Poll') &&
                <ViewPollResults title={post.title} description={post.content} options={post.poll_options} postId={post.id} />
            }

        </div>
    )
}

export default Posts;