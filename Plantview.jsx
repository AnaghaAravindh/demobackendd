import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import Plantedit from './Plantedit';

const Plantview = () => {
    var [ptype, setPtype]  = useState([]);
    var [selected, setSelected] = useState();
    var [update, setUpdate] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4005/pview")
            .then(response => {
                console.log(response.data)
                setPtype(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    const deletevalues = (id) => {
        console.log("Deleted", id)
        axios.put("http://localhost:4005/updatestatus/" + id)
            .then((response) => {
                alert("Deleted")
                window.location.reload(false);
            })

    }
    const updatevalues = (value) => {
        console.log("updateed", value);
        setSelected(value);
        setUpdate(true);

    }
    var result =
        <div>

            <Typography>PLANT TYPE</Typography><br></br>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Plant Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ptype.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{value.Planttype}</TableCell>
                                    <TableCell>{value.Status}</TableCell>
                                    <TableCell><EditIcon color='success' onClick={() => updatevalues(value)} /></TableCell>
                                    <TableCell><DeleteIcon color='error' onClick={() => deletevalues(value._id)} /></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
        </div>

    if (update) {
        result = <Plantedit data={selected} method='put' />
    }
    return (result)

}




export default Plantview
