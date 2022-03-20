import React, { useState } from 'react';
import {gql, useMutation} from "@apollo/client";
import './CreatePost.css';
import Dropdown from 'react-bootstrap/Dropdown';

const CREATE_POST = gql`
mutation createPost ($name: String!, $role: String!, 
$course: String!, $title: String!, $content: String!, 
$visibility: String!, $type: String!) {
    addPost(
        name: $name, 
        role: $role, 
        course: $course,
        title: $title,
        content: $content, 
        visibility: $visibility,
        type: $type
    ) {
        name
        role
        course
        title
        content
        visibility
        type
    }
}`;

export default function CreatePost() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('Student');
    const [course, setCourse] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('Public');
    const [type, setType] = useState('Question');

    const [ createPost ] = useMutation(CREATE_POST);

    const submit = (event) => {
        event.preventDefault();
        createPost({  variables: { name, role, course, title, content, visibility, type } });

        setName('');
        setRole('Student');
        setCourse('');
        setTitle('');
        setContent('');
        setRole('');
        setVisibility('Public');
        setType('Question');
    };


    return(
        <div className='div-post'>
            <form className="complex_post_form" id="add_post_form" onSubmit={submit}>
                <div className="post_title">Create a Post</div>
                Full Name:<input type="text" id="username" className="form_element" placeholder="Full Name" input value={name} 
                onChange={({ target }) => setName(target.value)} required/>

                Role:<Dropdown style={{ textAlign: "left", marginBottom: "5px", marginLeft: "5px", width: "40%" }}>
                    <Dropdown.Toggle id="dropdown-basic">
                        {role}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setRole("Student")}>Student</Dropdown.Item>
                        <Dropdown.Item onClick={() => setRole("TA")}>TA</Dropdown.Item>
                        <Dropdown.Item onClick={() => setRole("Professor")}>Professor</Dropdown.Item>
                    </Dropdown.Menu>
                    
                </Dropdown>  

                Course:<input type="text" id="course" className="form_element" placeholder="Course Code" input value={course} 
                onChange={({ target }) => setCourse(target.value)}required/>

                Title:<input type="text" id="title" className="form_element" placeholder="Post Title" input value={title} 
                onChange={({ target }) => setTitle(target.value)} required/>

                Content:<textarea rows="5" id="content" className="form_element" placeholder="Details" input value={content} 
                onChange={({ target }) => setContent(target.value)} required></textarea>

                Visibility:<Dropdown style={{ textAlign: "left", marginBottom: "5px", marginLeft: "5px", width: "30%" }}>
                    <Dropdown.Toggle id="dropdown-basic">
                        {visibility}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setVisibility("Public")}>Public</Dropdown.Item>
                        <Dropdown.Item onClick={() => setVisibility("Private")}>Private</Dropdown.Item>
                    </Dropdown.Menu>
                    
                </Dropdown>

                Type:<Dropdown style={{ textAlign: "left", marginBottom: "5px", marginLeft: "5px", width: "30%" }}>
                    <Dropdown.Toggle id="dropdown-basic">
                        {type}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setType("Question")}>Question</Dropdown.Item>
                        <Dropdown.Item onClick={() => setType("Note")}>Note</Dropdown.Item>
                        <Dropdown.Item onClick={() => setType("Poll")}>Poll</Dropdown.Item>
                    </Dropdown.Menu>
                    
                </Dropdown>  
                
                <button type="submit" className="btn">Create Post</button>
            </form>
        </div>
    );
}