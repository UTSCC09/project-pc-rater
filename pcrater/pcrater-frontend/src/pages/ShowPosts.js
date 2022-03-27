import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './ShowPosts.css';
import './Post.css';
import SearchBar from '../components/SearchBar';
import { gql, useQuery, useMutation } from '@apollo/client';


export default function ShowPosts({ isSearching, filteredData, postsData, setCreateOrShow, selectedCourse, currentPost, setPost }) {
    let reversePostsData = [];
    if(isSearching && filteredData){
        reversePostsData = filteredData.slice();
        reversePostsData = reversePostsData.reverse();
    }else if(postsData){
        reversePostsData = postsData.slice();
        reversePostsData = reversePostsData.reverse();
    }


    return(
        <div id="posts_container">
            <div id="post-functions">
            </div>
            <div id="posts">
            {reversePostsData && reversePostsData.map(post => {
                return <div className={currentPost.title === post.title ? "bg-azure post" : "bg-light post"} onClick={() => {
                    setCreateOrShow(false);
                    setPost(post);
                }}> 
                    <div className="post_name">
                        {post.role == "Student" &&
                            <span className='s_span'>S</span> 
                        }
                        {post.role == "TA" &&
                            <span className='t_span'>T</span> 
                        }
                        {post.role == "Professor" &&
                            <span className='p_span'>I</span> 
                        }
                        &nbsp;{post.title}</div>
                    <div className='d-flex justify-content-around'>
                        <div className="post_content">{post.content}</div>
                        <div  className="post_date">{post.createdAt}</div>
                    </div>
                </div>
            })}
            </div>
        </div>
    );
}