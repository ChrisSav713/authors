import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'
import axios from 'axios'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faPlus, faInfoCircle} from '@fortawesome/free-solid-svg-icons'

function New() {
    const navigate = useNavigate()
    const [validationError, setValidationError] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [author, setAuthor] = useState('')
        
    const sendCreateRequestToDatabase = async () => {
        try{
            const newAuthor = {name: author}
            const resp = await axios.post('http://localhost:8000/api/author', newAuthor)
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
            sendCreateRequestToDatabase()
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        console.log("Author = " + author)
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
            <h1 style={{textAlign: "center"}}>New Author</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{marginBottom:"3rem"}}>
                    <Form.Label htmlFor='name'>Name:</Form.Label>
                    <Form.Control 
                        type="text"
                        style={{border:"solid 2px"}}
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author}
                        required
                        autoComplete="off"
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
                    <span><FontAwesomeIcon style={{marginRight:".5rem"}} icon={faPlus}/>CREATE NEW</span>
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

export default New