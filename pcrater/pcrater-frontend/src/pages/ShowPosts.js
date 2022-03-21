import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './ShowPosts.css';
import SearchBar from '../components/SearchBar';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_POSTS = gql`
query findPosts {
    getPosts {
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

export default function ShowPosts() {
    let allPostsResult = useQuery(GET_POSTS);
    if(allPostsResult.loading){
        return <div>Loading...</div>
    }

    return(
        <div>
            <div id="post-functions">
                <Nav.Link href="create-post" className="create_post_btn">Create Post</Nav.Link>
                <SearchBar/>
            </div>
            <div id="posts">
            {allPostsResult.data.getPosts.map(post => {
                return <div className="post"> 
                    <div className="post_name">{post.name}</div>
                    <div className="post_content">{post.content}</div>
                    <div className="post_date">{post.createdAt}</div>
                </div>
            })}
            </div>
        </div>
    );
}