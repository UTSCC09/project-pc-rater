import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './ShowPosts.css';
import SearchBar from '../components/SearchBar';
import { gql, useQuery, useMutation } from '@apollo/client';


export default function ShowPosts({ filteredData, postsData, setCreateOrShow, selectedCourse, currentPost, setPost }) {
    let reversePostsData = [];
    if(filteredData){
        reversePostsData = filteredData.slice();
        reversePostsData = reversePostsData.reverse();
    }

    return(
        <div id="posts_container">
            <div id="post-functions">
            </div>
            <div id="posts">
            {reversePostsData && reversePostsData.map(post => {
                return <div style={{ backgroundColor: currentPost.title == post.title ? "azure" : "white" }} className="post" onClick={() => {
                    setCreateOrShow(false);
                    setPost(post);
                }}> 
                    <div className="post_name">
                        {post.role == "Student" &&
                            <span style={{ backgroundColor: "green", color: "white", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>S</span> 
                        }
                        {post.role == "TA" &&
                            <span style={{ backgroundColor: "blue", color: "white", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>T</span> 
                        }
                        {post.role == "Professor" &&
                            <span style={{ backgroundColor: "orange", color: "white", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>I</span> 
                        }
                        &nbsp;{post.title}</div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <div className="post_content">{post.content}</div>
                        <div  className="post_date">{post.createdAt}</div>
                    </div>
                </div>
            })}
            </div>
        </div>
    );
}