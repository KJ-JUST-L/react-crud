import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Header from "./Header";

const MySwal = withReactContent(Swal);

function Update() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [fullname, setFullname] = useState('');
    const [placeholderFullname, setPlaceholderFullname] = useState('');
    const [department, setDepartment] = useState('');
    const [placeholderDepartment, setPlaceholderDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [placeholderEmail, setPlaceholderEmail] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3333/api/users/${id}`)
        .then((response) => {
            setFullname(response.data[0].fullname);
            setPlaceholderFullname(response.data[0].fullname);
            setDepartment(response.data[0].department);
            setPlaceholderDepartment(response.data[0].department);
            setEmail(response.data[0].email === '-' ? '' : response.data[0].email);
            setPlaceholderEmail(response.data[0].email === '-' ? 'example@email.com' : response.data[0].email);
        })
    }, [id])

    const UpdateUser = (userId) => {
        if (fullname === placeholderFullname && department === placeholderDepartment) {
            MySwal.fire({
                icon: 'warning',
                title: 'Something went wrong!',
                text: 'Unable to update the same data again.',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1500,
                timerProgressBar: true
            })
        } else {
            MySwal.fire({
                icon: 'question',
                title: 'Want to save?',
                text: 'This action cannot be reversed.',
                confirmButtonText: 'Update',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`http://localhost:3333/api/users/${userId}`, {fullname, department, email})
                    .then((response) => {
                        response.data.code === "SUCCESS" ? 
                            MySwal.fire({
                                icon: 'success',
                                title: 'Update successfully',
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                navigate('/');
                            })
                        : '';
                    })
                }
            })
        }
    }

    return (
        <div>
            <Header/>
            <section className="flex justify-center items-center">
                <div className="card card-compact w-1/2 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title"><i className="bi bi-pencil-square"></i> Update User</h2>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-bold">Fullname</span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={fullname}
                                placeholder={placeholderFullname}
                                onChange={(e) => { setFullname(e.target.value) }}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-bold">Department</span>
                            </div>
                            <select
                                className="select select-bordered w-full"
                                value={department}
                                onChange={(e) => { setDepartment(e.target.value) }}
                            >
                                <option disabled defaultValue={department}>Pick one</option>
                                <option>Full-Stack Developer</option>
                                <option>Front-End Developer</option>
                                <option>Back-End Developer</option>
                            </select>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-bold">Email <small className="font-normal">(Optional)</small></span>
                            </div>
                            <input 
                                type="email"
                                className="input input-bordered w-full"
                                value={email}
                                placeholder={placeholderEmail}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </label>
                        <div className="card-actions justify-end mt-3">
                            <button className="btn btn-primary w-full" onClick={() => UpdateUser(id)}>Update User</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Update