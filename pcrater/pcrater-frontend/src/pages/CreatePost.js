import React, { useState } from 'react';
import {gql, useMutation} from "@apollo/client";
import './CreatePost.css';

export default function Post() {
    return(
        <div className='div-post'>
            <form className="complex_post_form" id="add_post_form">
                <div className="post_title">Create a Post</div>
                Full Name:<input type="text" id="username" class="form_element" placeholder="Full Name" required/>
                Role:<input type="text" id="role" class="form_element" placeholder="TA/PROFESSOR/STUDENT" required/>
                Course:<input type="text" id="course" class="form_element" placeholder="Course Code" required/>
                Title:<input type="text" id="title" class="form_element" placeholder="Post Title" required/>
                Content:<textarea rows="5" id="content" class="form_element" placeholder="Details" required></textarea>
                Visibility:<input type="text" id="visibility" class="form_element" placeholder="Private/Public" required/>
                Type:<input type="text" id="type" class="form_element" placeholder="Question/Note/Poll" required/>
                <button type="submit" class="btn">Create Post</button>
            </form>
        </div>
    );
}