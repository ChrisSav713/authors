import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App'
import { useNavigate } from 'react-router-dom'
import {useParams} from "react-router-dom";
import {Button, Form} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faBan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function Edit() {
    const [author, setAuthor] = useState({})
    const {id} = useParams(); 
    const navigate = useNavigate()

    const [validationError, setValidationError] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        const getAuthor = async () => {
            try {
                const result = await axios.get('http://localhost:8000/api/author/' + id)
                .then(res => {
                    setAuthor(res.data)
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

    const sendUpdateRequestToDatabase = async () => {
        try{
            const resp = await axios.put(`http://localhost:8000/api/author/update/${author._id}`, author)
            if(resp.data.name === "ValidationError") {
                //Input is invalid!!!
                const newError = {...new Error("Validation Error Occured"), resp}
                throw newError
            } else {
                //Input is valid, were done here
                navigate("/")
            }
        }
        catch (err) {
            //Didn't pass validation, set flags to display message to user on form
            setValidationError(true)
            setErrMsg(err.resp.data.errors.name.message)
            }
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrMsg("")
        setValidationError(false)
        try{
            sendUpdateRequestToDatabase()
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (e) => {
        setAuthor((prev) => {
            return {
                ...prev,
                name: e.target.value
            }
        })
    }

    useEffect(() => {
        console.log("Author(useEffect) = " + JSON.stringify(author))
    },[author])

    useEffect(() => {
        console.log("validationError = " + validationError)
    },[validationError])

    useEffect(() => {
        console.log("errMsg = " + errMsg)
    },[errMsg])

    const handleCancel = () => {
        navigate("/")
    }

    return (
        <div style={{width:"60%", margin:"auto auto", textAlign: "left"}}>
            <h1 style={{textAlign: "center"}}>Edit Author</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{marginBottom:"3rem"}}>
                    <Form.Label htmlFor='name'>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        style={{border:"solid 2px"}}
                        onChange={handleChange}
                        value = {author.name}
                        aria-describedby='validationInfo'
                    />
                    <Form.Text id="validationInfo" muted>
                            <span className={validationError ? 'info show' : 'info hide'}>
                            <FontAwesomeIcon icon={faInfoCircle} style={{marginRight:"1rem"}}/>
                            {errMsg}
                            </span>
                        </Form.Text>
                </Form.Group>
                <Button 
                    type="submit"
                    style={{width:"100%", marginBottom:"1rem" }} 
                    variant="outline-dark"
                >
                    <span><FontAwesomeIcon style={{marginRight:".5rem"}} icon={faPenToSquare}/>UPDATE</span>
                </Button>
                <Button 
                    style={{width:"100%", marginBottom:"1rem" }} 
                    variant="outline-dark"
                    onClick={handleCancel}
                >
                    <span><FontAwesomeIcon style={{marginRight:".5rem"}} icon={faBan}/>CANCEL</span>
                </Button>
            </Form>
        </div>
    )
}

export default Edit