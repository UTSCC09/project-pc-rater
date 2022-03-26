    import React, { useState } from 'react';
    import {gql, useMutation} from "@apollo/client";
    import Card from "react-bootstrap/Card";
    import ListGroup from "react-bootstrap/ListGroup";
    import Button from "react-bootstrap/Button";
    import './Post.css';
    import Badge from '@mui/material/Badge';
    import Dropdown from 'react-bootstrap/Dropdown';
    import Form from 'react-bootstrap/Form'

    const Post = ({ post, role }) => {
        const [ numUpvotes, setNumUpvotes ] = useState(0);

        const [ comments, setComments ] = useState([
            {
                content: "Let's go"
            },
            {
                content: "Niceeee"
            },
            {
                content: "amazing!"
            }
        ])

        return (
                <Card style = {{ width: "65%", marginTop: "10px" }}>
                    <Card.Header>Question</Card.Header>
                    <Card.Title style = {{ marginTop: "10px", paddingLeft: "10px" }}>
                        {post.role == "Student" &&
                            <span style={{ backgroundColor: "green", color: "white", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>S</span>  
                        }
                        {post.role == "TA" &&
                            <span style={{ backgroundColor: "blue", color: "white", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>T</span>  
                        }
                        {post.role == "Professor" &&
                            <span style={{ backgroundColor: "orange", color: "white", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>I</span>  
                        }
                        &nbsp;{post.title}
                    
                    </Card.Title>
                    <Card.Text style={{ paddingLeft: "10px" }}>{post.content}</Card.Text>
                    <Card.Footer style={{ display: "flex", verticalAlign: "middle", alignItems: "center" }}>
                        <Button size="sm" style={{ width: "10%", height: "90%" }}>Edit</Button>
                        <div className="good_question_text" style = {{ marginLeft: "20px", color: "blue", fontSize: "12px" }}>Good question |  {numUpvotes}</div>
                    </Card.Footer>
                    <ListGroup>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start m-2"
                        >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold"><span style={{ color: "white", backgroundColor: "green", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>S</span> Raz</div>
                                {comments[0].content}
                                </div>
                                <Badge className="good_question_text" style = {{ color: "blue" }} bg="primary" pill>
                                thanks! | 14
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start m-2"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold"><span style={{ color: "white", backgroundColor: "blue", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>T</span> Peter</div>
                                {comments[1].content}
                                </div>
                                <Badge className="good_question_text" style = {{ color: "blue" }} bg="primary" pill>
                                thanks! | 14
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start m-2"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold"><span style={{ color: "white", backgroundColor: "orange", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "3px", paddingRight: "3px" }}>I</span> Thierry</div>
                                {comments[2].content}
                                </div>
                                <Badge className="good_question_text" bg="primary" style = {{ color: "blue" }} pill>
                                thanks! | 14
                                </Badge>
                            </ListGroup.Item>
                    </ListGroup>

                    <Form style = {{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}>
                        <Form.Label>Start a new followup discussion</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Enter comment" />
                        <Button>Post</Button>
                    </Form>

                </Card>

        );
    };

    export default Post;