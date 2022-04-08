import React, { useContext, useState, useEffect, useRef } from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchBar from '../components/SearchBar';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import {gql, useQuery, useMutation} from "@apollo/client";
import { AuthContext } from '../context/auth';
import './ViewPoll.css';
import { Input } from '@material-ui/core';

const ADD_VOTE=gql`
mutation addVote($username: String!, $option: String!, $postId: ID!){
    addVote(username: $username, option: $option, postId: $postId) {
        username
        poll_options {
            option
            numVotes
            users
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


const ViewPollResults = ({title, description, options, postId}) => {
    const location = useLocation(); 
    const navigate = useNavigate();
    //const {title, description, options} = location.state;
    const [didVote, setDidVote] = useState(false);
    const { user } = useContext(AuthContext);
    const [ selectedOption, setSelectedOption ] = useState(options[0].option);
    const [ createVoteFunction ] = useMutation(ADD_VOTE); 
    let postResult = useQuery(GET_POST, { variables: { "id": postId }, skip: !postId, pollInterval: 2000 });

    if(postResult.loading){
        return <div>Loading...</div>;
    }


    const handleSubmitPoll = (e) => {
        e.preventDefault();
        if (selectedOption) {
            createVoteFunction({variables: {"username": user.username, 
            "option": selectedOption, "postId": postId}});
            setDidVote(true);
            // window.location.reload();
        }
    };


    return (
        <div className='d-flex'>
            <div className="align-items-center">
                <Card.Header className="mt-4">Poll</Card.Header>
                <h2 className="mt-1 text-center border-left border-right border-grey">{title}</h2>
                <Card className="view_poll_card">
                    <h5>{description}</h5>
                    <Form>
                        {(options.map(op => op.users.includes(user.username)).includes(true) || didVote) ?
                        <div>
                            <Form>
                                {postResult.data.getPost.poll_options.map((op, idx) => {
                                    return <div style={{ marginLeft: "40px"}}>
                                        <Form.Check disabled label={op.option + " (" + op.numVotes + ")"} checked={op.users.includes(user.username)} type="radio" name={title} />
                                    </div>
                                })}
                            </Form>

                            <Button disabled onClick={handleSubmitPoll} className="mt-2 w-25">Submit</Button>
                        </div> 
                        :
                        <div>
                            {/* <Form>
                                <select onChange={(e) => {
                                        setSelectedOption (e.target.value);
                                    }}>
                                {options.map((op, idx) => {
                                    return <option value={op.option} checked="checked" type="radio" label={op.option} 
                                    name={title} />
                                    
                                })}
                                </select>
                            </Form> */}

                            <Form>
                                <Form.Select onChange={(e) => {
                                        setSelectedOption (e.target.value);
                                    }}>
                                {options.map((op, idx) => {
                                    return <option value={op.option} checked="checked" type="radio" label={op.option} 
                                    name={title} />
                                    
                                })}
                                </Form.Select>
                            </Form>
                            
                            <Button onClick={handleSubmitPoll} className="mt-2 w-25">Submit</Button>
                        </div>

                        }
                    </Form>
                </Card>
                {(options.map(op => op.users.includes(user.username)).includes(true) || didVote) &&
                <p>You have voted (revoting is not allowed)</p>
                }
            </div>
        </div>
    );
};

export default ViewPollResults;