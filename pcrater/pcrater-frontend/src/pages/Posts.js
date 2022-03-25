import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {gql, useMutation} from "@apollo/client";
import CreatePost from './CreatePost';
import ShowPosts from './ShowPosts';
import SearchBar from '../components/SearchBar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import { FaTelegramPlane } from "react-icons/fa";
import Post from './Post';


const PostsNavBar  = ({ setCreateOrShow }) => {


    const courses = [
        {
            courseCode: "CSCA08",
            courseName: "Intro to cs I"
        },
        {
            courseCode: "CSCA48",
            courseName: "Intro to cs II"
        }
    ];
    const [selectedCourse, setSelectedCourse ] = useState("CSCA08"); 
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
                            <Dropdown.Item onClick={() => setSelectedCourse(courses[0].courseCode)}>{courses[0].courseCode} : {courses[0].courseName}</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedCourse(courses[1].courseCode)}>{courses[1].courseCode} : {courses[1].courseName}</Dropdown.Item>
                        </Dropdown.Menu>
                        
                    </Dropdown>  
                </div>

                <div style = {{ display: "flex" }}>
                    <Button onClick={() => setCreateOrShow(true)} size="sm" style={{ height: "50%", width: "25%", marginTop: "10px" }}><FaTelegramPlane /> New Post</Button>
                    <SearchBar placeholder="Search post..." />
                </div>
            </Card.Header>
        </Card>
    )
}

const Posts = () => {
    const [createOrShow, setCreateOrShow] = useState(false);
    return (
        <div style = {{ display: "flex" }}>
            <div>
                <PostsNavBar setCreateOrShow={setCreateOrShow} />
                <ShowPosts setCreateOrShow={setCreateOrShow} />
            </div>
            
            {createOrShow ?
                <CreatePost /> :
                <Post />
            }

        </div>
    )
}

export default Posts;