import React, { useState, useEffect, useRef } from 'react';
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

const ViewPollResults = () => {
    const location = useLocation(); 
    const {title, description, options} = location.state;
    const [didVote, setDidVote] = useState(false);

    const handleSubmitPoll = (e) => {
        e.preventDefault();
        setDidVote(true);
    };


    return (
        <div className="main" style={{ display: "flex" }}>
            <div className="subContainer" style={{ alignItems: 'center' }}>
                <h2 style={{ textAlign: "center" }}>{title}</h2>
                <Card style={{ width: '50rem', padding: "10px" }}>
                    <h5>{description}</h5>
                    <Form>
                        {didVote ?
                        <div>
                            <Form>
                                {options.map((option, idx) => {
                                    return <Form.Check disabled checked="checked" type="radio" label={option.val} name={title} />
                                })}
                            </Form>

                            <Button disabled onClick={handleSubmitPoll} style={{ marginTop: "10px", width: "30%" }}>Submit</Button>
                        </div> 
                        :
                        <div>
                            <Form>
                                {options.map((option, idx) => {
                                    return <Form.Check checked="checked" type="radio" label={option.val} name={title} />
                                    
                                })}
                            </Form>
                            
                            <Button onClick={handleSubmitPoll} style={{ marginTop: "10px", width: "30%" }}>Submit</Button>
                        </div>

                        }
                    </Form>
                </Card>
                {didVote &&
                <p>You have voted (revoting is not allowed)</p>
                }
            </div>
        </div>
    );
};

export default ViewPollResults;