import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './ShowPosts.css';
import SearchBar from '../components/SearchBar';
import { gql, useQuery, useMutation } from '@apollo/client'

export default function ShowPosts() {
    return(
        <div>
            <div id="post-functions">
                <Nav.Link href="create-post" className="create_post_btn">Create Post</Nav.Link>
                <SearchBar/>
            </div>
            <div id="posts">
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
                <div id="post">
                    <div className="post_username">Moh</div>
                    <div className="post_content">OMG WHAT IS GOING ON</div>
                    <div className="post_date">2020/20/02</div>
                </div>
            </div>
        </div>
    );
}