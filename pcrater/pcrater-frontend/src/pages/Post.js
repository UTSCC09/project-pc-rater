/* Credits: https://react-bootstrap.github.io/components/list-group/ */    

import { gql, useMutation, useQuery } from "@apollo/client";
import Badge from '@mui/material/Badge';
import React, { useContext, useState } from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth';
import './Post.css';



const ADD_COMMENT= gql`
    mutation addComment($id: ID!, $content: String!, $author: String!, $role: String!){
        addComment(id: $id, content: $content, author: $author, role: $role) {
            content
            title
            upvotes
            upvotes_list{
                username
            }
            comments {
                id
                content
                author
                role
                createdAt
                upvotes
                upvotes_list{
                    username
                }
            }
        }
    }
`;

const GET_POST = gql`
    query getPostById($id: ID!){
        getPost(id: $id){
            title
            content
            poll_options {
                users
                option
                numVotes
            }
            upvotes
            upvotes_list{
                username
            }
            comments {
                id
                content
                author
                role
                upvotes
                upvotes_list{
                    username
                }
            }
        }
    }
`;



const INCREASE_UPVOTES_COMMENT = gql`
    mutation increaseUpvotesForComment($postId: ID!, $commentId: ID!, $username: String!){
        increaseUpvotesComment(postId: $postId, commentId: $commentId, username: $username){
            content
            username
            role
            comments{
                id
                author
                content
                role
                upvotes
                upvotes_list{
                    username
                }
                createdAt
            }
            createdAt
            upvotes
            upvotes_list{
                username
            }
        }
    }
`;

const INCREASE_UPVOTES_POST = gql`
    mutation($id: ID!, $username: String!) {
        increaseUpvotesPost(id: $id, username: $username) {
            id
            createdAt
            username
            content
            title
            comments {
                id
                author
                content
                upvotes
                upvotes_list{
                    username
                }
                role
            }
            role
            upvotes
            upvotes_list{
                username
            }
        }
    }
`;

const UPDATE_POST = gql`
    mutation($id: ID!, $title: String!, $content: String!) {
    updatePost (id: $id, title: $title, content: $content) {
        username
        role
        course
        title
        content
        type
    }
  }
`;


const Post = ({ post, role }) => {
    const navigate = useNavigate();
    const [ commentContent, setCommentContent ] = useState("");
    const { user } = useContext(AuthContext);
    const [ isEditing, setIsEditing ]  = useState(false); 
    const [ title, setTitle] = useState(post.title);
    const [ content, setContent] = useState(post.content);

    let postResult = useQuery(GET_POST, { variables: { "id": post.id }, skip: !post.id });
    let [ addNewComment ] = useMutation(ADD_COMMENT, {
        refetchQueries: [ GET_POST ]
    });
    let [ increaseUpvotesPost ] = useMutation(INCREASE_UPVOTES_POST, {
        refetchQueries: [ GET_POST ]
    });
    let [ increaseUpvotesComment ] = useMutation(INCREASE_UPVOTES_COMMENT, {
        refetchQueries: [ GET_POST ]
    });

    let [ updatePost ] = useMutation(UPDATE_POST, {
        refetchQueries: [ GET_POST ]
    });


    if(postResult.loading){
        return <div>Loading...</div>
    }

    function editHandler() {
        setIsEditing(true);
    }

    function submitHandler() {
        setIsEditing(false);
        if (post.username === user.username) {
            updatePost({ variables: { "id": post.id, "title": title, "content": content } });
        }
    }



    return (
            <Card style = {{ width: "65%", marginTop: "10px" }}>
                <Card.Header>{post.type}</Card.Header>
                <Card.Title style = {{ marginTop: "10px", paddingLeft: "10px" }}>
                    {post.role === "Student" &&
                        <span className="s_span">S</span>  
                    }
                    {post.role === "TA" &&
                        <span className="t_span">T</span>  
                    }
                    {post.role === "Professor" &&
                        <span className="p_span">I</span>  
                    }
                    &nbsp;{!isEditing ? <span>{postResult.data.getPost.title}</span> : <input placeholder="Enter new title" defaultValue={post.title} onChange={(e) => setTitle(e.target.value)}/>}
                
                </Card.Title>
                <Card.Text className="post_content">{!isEditing ? <span>{postResult.data.getPost.content}</span> : <input placeholder="Enter new content" defaultValue={post.content} onChange={(e) => setContent(e.target.value)}/>}</Card.Text>
                <Card.Footer className="card_footer">
                    {(!isEditing && (post.username === user.username)) ?
                        <Button size="sm" className="edit_button" onClick={editHandler}>Edit</Button> :
                        (isEditing) ?
                        <Button size="sm" className="edit_button" onClick={submitHandler}>Submit</Button> :
                        null
                    }
                    {postResult.data.getPost.upvotes_list.map(upvote => upvote.username).includes(user.username) ?
                    <div className="good_question_text" style = {{ marginLeft: "20px", color: "blue", fontSize: "12px" }}>You have upvoted |  {postResult.data.getPost.upvotes}</div> :
                    <div onClick={() => increaseUpvotesPost({ variables: { "id": post.id, "username": user.username } })} className="good_question_text" style = {{ marginLeft: "20px", color: "blue", fontSize: "12px" }}>Good question |  {postResult.data.getPost.upvotes}</div>
                    }
                </Card.Footer>
                <ListGroup>
                        {postResult.data && postResult.data.getPost.comments && postResult.data.getPost.comments.map(comment => {
                            if(comment.role.toLowerCase() === "student"){
                                return (
                                    <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start m-2"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold"><span className="s_span">S</span> {comment.author}</div>
                                            {comment.content}
                                        </div>
                                        {comment.upvotes_list.map(upvote => upvote.username).includes(user.username) ?
                                        <Badge className="good_question_text" style = {{ color: "blue" }} bg="primary" pill>
                                            you have upvoted! | {comment.upvotes}
                                        </Badge> :
                                        <Badge onClick={() => increaseUpvotesComment({ variables: { "postId": post.id, "commentId": comment.id, "username": user.username } })} className="good_question_text" style = {{ color: "blue" }} bg="primary" pill>
                                            thanks! | {comment.upvotes}
                                        </Badge>
                                        }
                                    </ListGroup.Item>
                                ) 
                            }else if(comment.role.toLowerCase() === "ta"){
                                return (
                                    <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start m-2"
                                    >
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold"><span className="t_span">T</span> {comment.author}</div>
                                        {comment.content}
                                        </div>
                                        {comment.upvotes_list.map(upvote => upvote.username).includes(user.username) ?
                                        <Badge className="good_question_text" style = {{ color: "blue" }} bg="primary" pill>
                                            you have upvoted! | {comment.upvotes}
                                        </Badge> :
                                        <Badge onClick={() => increaseUpvotesComment({ variables: { "postId": post.id, "commentId": comment.id, "username": user.username } })} className="good_question_text" style = {{ color: "blue" }} bg="primary" pill>
                                            thanks! | {comment.upvotes}
                                        </Badge>
                                        }
                                    </ListGroup.Item>
                                ) 
                            }else if(comment.role.toLowerCase() === "professor"){
                                return (
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start m-2"
                                    >
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold"><span className="p_span">I</span> {comment.author}</div>
                                        {comment.content}
                                        </div>
                                        {comment.upvotes_list.map(upvote => upvote.username).includes(user.username) ?
                                        <Badge className="good_question_text" style = {{ color: "blue" }} bg="primary" pill>
                                            you have upvoted! | {comment.upvotes}
                                        </Badge> :
                                        <Badge onClick={() => increaseUpvotesComment({ variables: { "postId": post.id, "commentId": comment.id, "username": user.username } })} className="good_question_text" style = {{ color: "blue" }} bg="primary" pill>
                                            thanks! | {comment.upvotes}
                                        </Badge>
                                        }
                                    </ListGroup.Item>
                                ) 
                            }
                        })}
                </ListGroup>

                <Form style = {{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}>
                    <Form.Label>Start a new followup discussion</Form.Label>
                    <Form.Control value={commentContent} onChange={({ target }) => setCommentContent(target.value)} as="textarea" rows={4} placeholder="Enter comment" />
                    <Button onClick={() => {
                        if(commentContent){
                            addNewComment({ variables: { "role": role, "author": user.username, "content": commentContent, "id": post.id } })
                            setCommentContent("");
                        }
                    }}>Post</Button>
                </Form>

            </Card>

    );
};

export default Post;