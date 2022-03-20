import React, { useState } from 'react';
import {gql, useMutation} from "@apollo/client";
import './CreatePost.css';

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

export default function Post() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [course, setCourse] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('');
    const [type, setType] = useState('');

    const [ createPost ] = useMutation(CREATE_POST);

    const submit = (event) => {
        event.preventDefault();
        createPost({  variables: { name, role, course, title, content, visibility, type } });

        setName('');
        setRole('');
        setCourse('');
        setTitle('');
        setContent('');
        setRole('');
        setVisibility('');
        setType('');
      };


    return(
        <div className='div-post'>
            <form className="complex_post_form" id="add_post_form" onSubmit={submit}>
                <div className="post_title">Create a Post</div>
                Full Name:<input type="text" id="username" class="form_element" placeholder="Full Name" input value={name} 
                onChange={({ target }) => setName(target.value)} required/>

                Role:<input type="text" id="role" class="form_element" placeholder="TA/PROFESSOR/STUDENT" input value={role} 
                onChange={({ target }) => setRole(target.value)}required/>

                Course:<input type="text" id="course" class="form_element" placeholder="Course Code" input value={course} 
                onChange={({ target }) => setCourse(target.value)}required/>

                Title:<input type="text" id="title" class="form_element" placeholder="Post Title" input value={title} 
                onChange={({ target }) => setTitle(target.value)} required/>

                Content:<textarea rows="5" id="content" class="form_element" placeholder="Details" input value={content} 
                onChange={({ target }) => setContent(target.value)} required></textarea>

                Visibility:<input type="text" id="visibility" class="form_element" placeholder="Private/Public" input value={visibility} 
                onChange={({ target }) => setVisibility(target.value)}required/>

                Type:<input type="text" id="type" class="form_element" placeholder="Question/Note/Poll" input value={type} 
                onChange={({ target }) => setType(target.value)} required/>
                
                <button type="submit" class="btn">Create Post</button>
            </form>
        </div>
    );
}