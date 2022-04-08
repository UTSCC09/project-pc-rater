import { gql, useQuery } from "@apollo/client";
import React, { useContext, useState } from 'react';
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import ErrorMessage from "../components/ErrorMessage";
import { AuthContext } from '../context/auth';
import CreatePoll from './CreatePoll';
import './CreatePost.css';


const FIND_USER = gql`
    query findUserByUsername($username: String!) {
        findUser(username: $username) {
            username
            institution
            firstname
            lastname
        }
    }
`;

export default function CreatePost({ setIsSearching, createPostFunction, role, selectedCourse }) {

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('Public');
    const [type, setType] = useState('Question');
    const { user } = useContext(AuthContext);
    
    
    let userResult = useQuery(FIND_USER, {variables: { "username": user.username }, skip: !user.username,});



    if(userResult.loading){
        return <div>Loading...</div>
    }

    const submit = (event) => {
        event.preventDefault();
        if(!userResult.data || !userResult.data.findUser.firstname || !userResult.data.findUser.lastname){
            setErrorMessage("Cannot create a post with invalid user data.");
            setShowError(true);
        }
        setIsSearching(false);
        createPostFunction({  variables: {"username": user.username , "role": role, "course": selectedCourse, title, content, visibility, type } });

        setTitle('');
        setContent('');
        setVisibility('Public');
        setType('Question');
    };

    return(
        <div className='div-post'>
            {showError && 
            <ErrorMessage isDismissible="dismissble" errorMessage={errorMessage} setShowError={setShowError} />}
            <form className="complex_post_form" id="add_post_form" onSubmit={submit}>
                <div className="post_title">Create a Post</div>

                Type:<Dropdown className="tet-left mb-2 ml-1 w-25" >
                    <Dropdown.Toggle id="dropdown-basic">
                        {type}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setType("Question")}>Question</Dropdown.Item>
                        <Dropdown.Item onClick={() => setType("Poll")}>Poll</Dropdown.Item>
                    </Dropdown.Menu>
                    
                </Dropdown>  
                
                {(type === "Question") ?
                    <>
                        Title:<input type="text" id="title" className="form_element" placeholder="Post Title" input="true" value={title} 
                            onChange={({ target }) => setTitle(target.value)} required/>
                        Content:<textarea rows="5" id="content" className="form_element" placeholder="Details" input="true" value={content} 
                            onChange={({ target }) => setContent(target.value)} required></textarea>
                        <Button type="submit" className="btn">Create Post</Button>
                    </> :
                    <>
                        <CreatePoll role={role} selectedCourse={selectedCourse}/>
        
                    </>
                

                }


            </form>
        </div>
    );
}