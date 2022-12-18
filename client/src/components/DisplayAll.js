import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const DisplayAll = () => {
    const navigate = useNavigate()
    const [authorList, setAuthorList] = useState([])

    useEffect(() => {
        const getAuthors = async () => {
            try {
                const result = await axios.get('http://localhost:8000/api/author')
                .then(res => {
                    setAuthorList(res.data)
                })
                .catch((err) => {
                    alert("Response Error\n" + JSON.stringify(err))
                })
            } catch (err) {
                if(err.response) {
                    //not in 200 response range meaning there are no records in database so we won't trip an error message to user
                    document.getElementById("header").textContent = "No records found"
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                } else {
                    console.log(`Error: ${err.message}`)
                }
            }
        }
        getAuthors()
    },[])
    
    return (
        <div style={{width:"60%", margin:"auto auto", textAlign: "center"}}>
            <h1 id="header">
                All Authors
            </h1>

            <Button 
                style={{width:"100%", marginBottom:"1rem"}} 
                variant="outline-dark"
                onClick={() => navigate('/new')}>
                <span><FontAwesomeIcon style={{marginRight:".5rem"}} icon={faPlus}/>ADD NEW</span>
            </Button>

            <Table bordered hover  style={{border:"1px"}}>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                
                    {authorList ? (
                        <>
                            {authorList.map(item => {
                                return(
                                    <tr key={item._id}>
                                        <td style={{verticalAlign:'middle'}}>
                                            {item.name}
                                        </td>
                                        <td style={{display: "flex"}}>
                                            <Button 
                                                style={{width:"100%", margin:"1rem" }} 
                                                variant="outline-dark"
                                                onClick={() => navigate(`/edit/${item._id}`)}
                                            >
                                                <span><FontAwesomeIcon style={{marginRight:".5rem"}} icon={faPenToSquare}/>EDIT</span>
                                            </Button>
                                            <Button 
                                                style={{width:"100%", margin:"1rem" }} 
                                                variant="outline-danger"
                                                onClick={() => navigate(`/delete/${item._id}`)}
                                            >
                                                <span><FontAwesomeIcon style={{marginRight:".5rem"}} icon={faTrash}/>DELETE</span>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                    ) : 
                        ("Loading...")
                    }

                </tbody>
            </Table>
        </div>
    )
}   
export default DisplayAll