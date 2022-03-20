import React, { useState, useEffect, useRef } from 'react';
import './CreatePoll.css';
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


const PollItem = (props) => {
    const {optionObj, deletePollItem} = props;
    console.log(optionObj);
    console.log(optionObj.val);
    return (
        <ListGroup.Item>{optionObj.val}</ListGroup.Item>
    )
};

const CreatePoll = () => {
    let itemContentRef = useRef(null);
    const [pollOptions, setPollOptions] = useState([]);
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    
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
            navigate("/view-poll", { state: {title: titleValue, description: descriptionValue, options: pollOptions} })
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
        <div className="main" style={{ display: "flex" }}>
            <div className="subContainer" style={{ alignItems: 'center' }}>
                <h2 style={{ textAlign: "center" }}>Create New Poll</h2>
                {showError && 
                <ErrorMessage errorMessage={errorMessage} setShowError={setShowError} />}
                <Card style={{ width: '50rem', padding: "10px" }}>
                    <Form>
                        <Form.Control onChange={handleTitleChange} placeholder="Enter poll's title" />
                        <Form.Control onChange={handleDescriptionChange} as="textarea" style={{ marginTop: "5px", marginBottom: "10px" }} placeholder="Enter poll's description" />
                        <Form.Label>Poll options</Form.Label>
                        <div style={{ display: "flex", width: "50%" }}>
                            <Form.Control ref={itemContentRef} placeholder="Enter a new poll choice"></Form.Control>
                            <Button onClick={handleAddClick} style={{ width: "30%" }}>Add</Button>
                        </div>
                        <ListGroup style={{ marginTop: "10px", marginBottom: "5px"}} id="poll_options">
                            {pollOptions.map((option, idx) => {
                                return <PollItem 
                                    key={'poll-idx-${idx}'}
                                    optionObj={option}
                                    deleteThisPollItem={() => deletePollItem(idx)}
                                />
                            })}
                        </ListGroup>
                        <div style={{ display: "flex", width: "50%" }}>
                            <Button onClick={handleSubmitPoll} style={{ margin: "2px" }}>Post New Poll</Button>
                            <Button onClick={handleCancelClick} style={{ margin: "2px" }} variant="secondary">Cancel</Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default CreatePoll;
