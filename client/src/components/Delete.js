import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons'

function Delete() {
    const [author, setAuthor] = useState({})
    const {id} = useParams(); 
    const navigate = useNavigate()

    const [show, setShow] = useState(true);
    
    const handleClose = () => {
        setShow(false);
        navigate("/")
    }

    useEffect(() => {
        const getAuthor = async () => {
            try {
                const result = await axios.get('http://localhost:8000/api/author/' + id)
                .then(res => {
                    setAuthor(res.data)
                    console.log(res.data)
                })
                .catch((err) => {
                    alert("Response Error\n" + JSON.stringify(err))
                })
            } catch (err) {
                if(err.response) {
                    //not in 200 response range
                    document.getElementById("header").textContent = "No records found"
                } else {
                    alert("Response Error\n" + JSON.stringify(err))
                }
            }
        }
        getAuthor()
    },[])

    const sendDeleteRequestToDatabase = async () => {
        try{
            const resp = await axios.delete(`http://localhost:8000/api/author/delete/${author._id}`)
            .then((res) => {
                return res.data
            })
            navigate("/")
        } catch (err) {
            alert("Response Error\n" + JSON.stringify(err))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            sendDeleteRequestToDatabase()
        } catch (err) {
            alert("Response Error\n" + JSON.stringify(err))
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Author</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {author.name}?</Modal.Body>
                <Modal.Footer>
                    <Button 
                        style={{width:"100%", marginBottom:"1rem" }} 
                        variant="outline-danger"
                        onClick={handleSubmit}
                    >
                        <span><FontAwesomeIcon style={{marginRight:".5rem"}} icon={faTrash}/>DELETE</span>
                    </Button>
                    <Button 
                        style={{width:"100%", marginBottom:"1rem" }} 
                        variant="outline-primary" 
                        onClick={handleClose}
                    >
                        <span><FontAwesomeIcon style={{marginRight:".5rem"}} icon={faBan}/>CANCEL</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Delete

