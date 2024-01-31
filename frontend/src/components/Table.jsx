import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Table() {
    const navigate = useNavigate();
    const [users, setUser] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3333/api/users')
        .then((response) => {
            console.log(response.data);
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
            setError('Error fetching data');
        });
    }, [])

    const handleUpdate = (userId) => {
        navigate(`/update/${userId}`);
    };

    const handleDelete = (userId) => {
        console.log(`Delete user with ID: ${userId}`);
        MySwal.fire({
            icon: 'question',
            title: 'Want to delete?',
            text: 'This action cannot be reversed.',
            confirmButtonText: 'Confirm Delete',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3333/api/users/${userId}`)
                .then((response) => {
                    if (response.data.code === "SUCCESS") {
                        setUser(prevUsers => prevUsers.filter(user => user.id !== userId));
                        MySwal.fire({
                            icon: 'success',
                            title: 'Delete successfully',
                            text: response.data.message,
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                })
            }
        })
    };

    if (error) {
        return <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error! Task failed successfully.</span>
        </div>
    }

    return (
        <table className="table shadow">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Fullname</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                    <tr >
                        <td colSpan="5">
                            <div role="alert" className="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>No data to display</span>
                            </div>
                        </td>
                    </tr>
                ) : (
                    users.map((user, key) => (
                        <tr key={user.id}>
                            <td>{key+1}</td>
                            <td>{user.fullname}</td>
                            <td>{user.department}</td>
                            <td>{user.email}</td>
                            <td>
                                <div className="join">
                                    <button
                                    className="btn btn-sm btn-warning join-item"
                                    onClick={() => handleUpdate(user.id)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button
                                    className="btn btn-sm btn-error join-item"
                                    onClick={() => handleDelete(user.id)}>
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}

export default Table