import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import './Home.css';


export default function Signup() {

    const [open, setOpen] = useState(false);

    return(
        <div className="home">
            <header>
                <div className='big-header'>
                    <div className='mask'>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-white'>
                            <h1 className='large-header'>Stay in the loop 💡</h1>
                            <h4 className='sub-header'>Get insider information on your future courses/professors</h4>
                        </div>
                    </div>
                    </div>
                </div>
            </header>
            <div className="body-div">
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    id="whybtn">
                    Why PCRater?
                </Button>
                <div className='collapseContainer'>
                    <Collapse in={open} dimension="width">
                    <div id="example-collapse-text">
                        <Card body className="collapseBody">
                        PCRater is a web application that provides a central platform for students to come and join forums for their courses. Users can join classes as students, TAs or even professors based on their assigned role in the class. As a result, the students will be able to figure out the answers to their questions and doubts, which will improve their success rate.
                        </Card>
                    </div>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}