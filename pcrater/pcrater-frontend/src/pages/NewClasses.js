import React, { useState, useEffect, useRef } from 'react';
import './NewClasses.css';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchBar from '../components/SearchBar';
import ErrorMessage from '../components/ErrorMessage';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/CloseButton';

const current_semester = "Winter 2022";

let classes = [
    {
        code: "CSCC69",
        name: "Operating Systems"
    },
    {
        code: "CSCC43",
        name: "Databases"
    },
    {
        code: "CSCC37",
        name: "Numerical Analysis"
    },
    {
        code: "CSCC63",
        name: "Computability and Computational Complexity"
    },
    {
        code: "CSCB36",
        name: "Numerical Analysis"
    },
    {
        code: "STAB52",
        name: "Statistics"
    }
];
    

const New_Classes = () => {
    const [classCode, setClassCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [joinAsSelection, SetJoinAsSelection] = useState("student");
    const [classesList, setClassesList] = useState(classes);
    const [willCreateNewClass, setWillCreateNewClass] = useState(false);
    const [universityError, setUniversityError] = useState('');
    const [courseNameError, setCourseNameError] = useState('');
    const [showError, setShowError] = useState(false);

    const [show, setShow] = useState(false);
    const [university, setUniversity] = useState("University of Toronto");
    const [universityInputVal, setUniversityInputVal] = useState("");
    const [universitiesJson, setUniversitiesJson] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleCreateNewClassClick(){
        if(willCreateNewClass){
            SetJoinAsSelection("student");
        }else{
            SetJoinAsSelection("professor");
        }
        setWillCreateNewClass(!willCreateNewClass);
    }

    function addNewClass(){
        let classObj = classesList.find(classElmt => classElmt.code == classCode);
        if(!willCreateNewClass && !classObj){
            setUniversityError('');
            setCourseNameError("The course is not found.");
            setShowError(true);
        }else{
            setCourseNameError('');
            setUniversityError('');
            setShowError(false);
            classes.push({"code": classCode, "name": courseName});
            setCourseName('');
            setClassCode('');
            setClassesList(classes);
        }

    }

    function handleUniversityChange(newValue){
        if(newValue){
            let universityObject = universitiesJson.find(elmt => elmt.name.toLowerCase() == newValue.toLowerCase());
            if(universityObject){
                setUniversity(universityObject.name);
                setShow(false);
                setUniversityError('');
            }else{
                setUniversityError("The university you entered does not exist, please try a different one");
                setShowError(true);
                setShow(false);
            }
        }
    }

    //This will be used for fetching data from the database
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
        .then((res) => {
            return res.json();
        })
        .then((jsonObj) => {
            setUniversitiesJson(jsonObj);
        })
        .catch((err) =>{
            console.log(err);
        });
    });

    return (
        <div className="main" style={{ display: "flex" }}>
            <div className="subContainer" style={{ alignItems: 'center' }}>
                <h2 style={{ textAlign: "center" }} className="universityHeader">{university}</h2>
                <p style={{ textAlign: "center" }} onClick={handleShow}>(Change school)</p>
                {((universityError !== '' || courseNameError !== '') && showError) &&                
                <ErrorMessage errorMessage={universityError === '' ? courseNameError : universityError} setShowError={setShowError} />
                }
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Change schools</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <SearchBar placeholder="Enter the name of your university" setSearchWord ={setUniversityInputVal} data={universitiesJson} attributeToSearchFor="name" />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUniversityChange(universityInputVal)}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div style={{ justifyContent: "center" }}>
                    <Card style={{ width: '50rem' }}>
                        <Card.Header style = {{ textAlign: "left", fontWeight: "bold", fontSize: "18px" }}>{current_semester} classes</Card.Header>
                        <ListGroup  variant="flush" className="courses_list" style = {{ textAlign: 'left' }}>
                            {classesList.map(classCode => {
                              return <ListGroup.Item>{classCode.code}: {classCode.name}</ListGroup.Item>  
                            })}
                        </ListGroup>
                        <Form style={{ marginTop: "10px" }}>
                            <Form.Check
                             onClick={() => handleCreateNewClassClick()} 
                             style = {{ textAlign: "left", marginLeft: "10px", marginTop: "5px", marginBottom: "10px" }} 
                             label="Create new class? (professors only)" 
                             />
                            <div style={{ display: "flex" }}>
                                {
                                    willCreateNewClass &&
                                    <div style={{ display: "flex", width: "100%" }}>
                                        <Form.Control placeholder="Enter class name" size="lg" style={{ marginLeft: "5px", marginRight: "5px" }} onChange={(e) => setCourseName(e.target.value)} /> 
                                        <Form.Control placeholder="Enter class code" size="lg" style={{ marginLeft: "5px", marginRight: "5px" }} onChange={(e) => setClassCode(e.target.value)} />
                                    </div>
                                }

                                {
                                    !willCreateNewClass &&
                                    <SearchBar setSearchWord={setClassCode} placeholder = "Enter a class code..." data={classes} attributeToSearchFor="code" />
                                }
                                
                            </div>
                        </Form>
                        {!willCreateNewClass &&
                        <Dropdown style={{ textAlign: "left", marginBottom: "5px", marginLeft: "5px", width: "30%" }}>
                            <Dropdown.Toggle id="dropdown-basic">
                                Join as a {joinAsSelection}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => SetJoinAsSelection("student")} href="#/action-1">Student</Dropdown.Item>
                                <Dropdown.Item onClick={() => SetJoinAsSelection("TA")} href="#/action-2">TA</Dropdown.Item>
                                <Dropdown.Item onClick={() => SetJoinAsSelection("professor")} href="#/action-3">Professor</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>  
                        }       
                        <Button style={{ marginTop: "10px" }} variant="primary" size="lg" onClick={() => addNewClass()}>
                        {willCreateNewClass ?
                        "Create new class" :
                        "Join new class"
                        }
                        
                        </Button>
 
                        <h6 style={{ textAlign: "center" }} className='browse_classes_title'>Browse current classes</h6>

                    </Card>
                </div>
            </div>
        </div>
    );
};

export default New_Classes;