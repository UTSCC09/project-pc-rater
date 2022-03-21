import React, { useState, useEffect, useRef } from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchBar from './SearchBar';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/CloseButton';

const SuccessMessage = (props) => {
    const {successMessage, setShowSuccess} = props;
    return (
        <Alert style={{ textAlign: "left", width: '50rem' }} variant="success" onClose={() => setShowSuccess(false)} dismissible>
            <p style={{ color: "green" }}>
                {successMessage}
            </p>
        </Alert>
    );
}

export default SuccessMessage;