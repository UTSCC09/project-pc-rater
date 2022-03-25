    import React, { useState } from 'react';
    import {gql, useMutation} from "@apollo/client";
    import Card from "react-bootstrap/Card";
    import ListGroup from "react-bootstrap/ListGroup";
    import Button from "react-bootstrap/Button";
    import './Post.css';
    import Badge from '@mui/material/Badge';
    import Dropdown from 'react-bootstrap/Dropdown';

    const Post = () => {
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
            // <div>Individual post</div>
            <Card style = {{ width: "65%", marginTop: "10px" }}>
                <Card.Header>Question</Card.Header>
                <Card.Title style = {{ marginTop: "10px", paddingLeft: "10px" }}>Will P-NP be on the exam?</Card.Title>
                <Card.Text style={{ paddingLeft: "10px" }}>If it will be I need help. How do I do it? Please help me figure this out. Please.</Card.Text>
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
                            <div className="fw-bold"><span style={{ color: "white", backgroundColor: "green" }}>S</span> Raz</div>
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
                            <div className="fw-bold"><span style={{ color: "white", backgroundColor: "orange" }}>i</span> Peter</div>
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
                            <div className="fw-bold"><span style={{ color: "white", backgroundColor: "orange" }}>i</span> Thierry</div>
                            {comments[2].content}
                            </div>
                            <Badge className="good_question_text" bg="primary" style = {{ color: "blue" }} pill>
                            thanks! | 14
                            </Badge>
                        </ListGroup.Item>
                </ListGroup>

            </Card>
        );
    };

    export default Post;