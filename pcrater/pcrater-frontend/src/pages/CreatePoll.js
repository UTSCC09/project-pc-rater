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
import ErrorMessage from "../components/ErrorMessage";
import {gql, useQuery, useMutation} from "@apollo/client";
import { AuthContext } from '../context/auth';


const ADD_POLL=gql`
mutation addPoll($username: String!, $role: String!, $course: String!, $title: String!, $content: String!, $visibility: String!, $poll_options: [String!]){
    addPoll(username: $username, role: $role, course: $course, title: $title, content: $content, visibility: $visibility, poll_options: $poll_options) {
        username
        role
        course
        title
        content
        visibility
        poll_options {
            users
            option
            numVotes
        }
    }
  }

`;


const PollItem = (props) => {
    const {optionObj, deletePollItem} = props;
    return (
        <ListGroup.Item>{optionObj.val}</ListGroup.Item>
    )
};

const CreatePoll = ({role, selectedCourse}) => {
    let itemContentRef = useRef(null);
    const [pollOptions, setPollOptions] = useState([]);
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [visibility, setVisibility] = useState('Public');

    const [ createPollFunction ] = useMutation(ADD_POLL); 


    
    const addPollItem = (val) => {
        const newPollItem = {
            id: 'option-${pollOptions.length}',
            val
        };
        setPollOptions([...pollOptions, newPollItem]);
    };
    
    const deletePollItem = (itemIdx) => {
        setPollOptions(() => {
            const newPollItems = [...pollOptions];
            newPollItems.splice(itemIdx, 1);
            return newPollItems;
        });
    };

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescriptionValue(e.target.value);
    };
    
    const handleAddClick = (e) => {
        e.preventDefault();
        const val = itemContentRef.current.value;
        if(val && !pollOptions.map((option, idx) => option.val).includes(val)){
            addPollItem(val);
        }else if(!val){
            setErrorMessage("The new poll's choice field cannot be empty.")
            setShowError(true);
        }else{
            setErrorMessage("No two options in the poll can be the exact same.")
            setShowError(true);
        }
        itemContentRef.current.value = '';        
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        navigate("/");
    };

    const handleSubmitPoll = (e) => {
        e.preventDefault();
        if(titleValue && descriptionValue && pollOptions.length > 1){
            //navigate("/view-poll", { state: {title: titleValue, description: descriptionValue, options: pollOptions} })
            createPollFunction({variables: {"username": user.username , 
            "role": role, "course": selectedCourse, title: titleValue, 
            content: descriptionValue, visibility: visibility, poll_options: pollOptions.map(option => option.val)}})
            setPollOptions([])
            setTitleValue('')
            setDescriptionValue('');
            window.location.reload();
        }else if(!titleValue){
            setErrorMessage('The poll\'s title cannot be empty.');
            setShowError(true);
        }else if(!descriptionValue){
            setErrorMessage('The poll\'s description cannot be empty.');
            setShowError(true);

        }else{
            setErrorMessage('There must be at least two options for the poll.');
            setShowError(true);
        }
    };

    return (
        <div>
            <div>
                {showError && 
                <ErrorMessage isDismissible="dismissble" errorMessage={errorMessage} setShowError={setShowError} />}
                <Card className="p-2">
                    <Form>
                        <Form.Control onChange={handleTitleChange} value={titleValue} placeholder="Enter poll's title" />
                        <Form.Control onChange={handleDescriptionChange} as="textarea" className="mt-2 mb-1" value={descriptionValue} placeholder="Enter poll's description" />
                        <Form.Label>Poll options</Form.Label>
                        <div className="d-flex w-50">
                            <Form.Control ref={itemContentRef} placeholder="Enter a new poll choice"></Form.Control>
                            <Button onClick={handleAddClick} className="w-50">Add</Button>
                        </div>
                        <ListGroup className="mt-2 mb-1" id="poll_options">
                            {pollOptions.map((option, idx) => {
                                return <PollItem 
                                    key={'poll-idx-${idx}'}
                                    optionObj={option}
                                    deleteThisPollItem={() => deletePollItem(idx)}
                                />
                            })}
                        </ListGroup>
                        <div className="d-flex w-50">
                            <Button onClick={handleSubmitPoll} className="m-1">Post New Poll</Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default CreatePoll;
