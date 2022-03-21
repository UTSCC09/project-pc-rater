import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import {gql, useMutation} from "@apollo/client";
import './Home.css'
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarToggler,
    MDBNavbarLink,
    MDBContainer,
    MDBIcon
} from 'mdb-react-ui-kit';

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
                    Why PCRaters?
                </Button>
                <div style={{minHeight: '150px'}}>
                    <Collapse in={open} dimension="width">
                    <div id="example-collapse-text">
                        <Card body style={{width: '800px'}}>
                            PCRaters allows students to get multiple opinions before embarking with a certain course or professor. Having these reviews and ratings creates transparency.
                        </Card>
                    </div>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}