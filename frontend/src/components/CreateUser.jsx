import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Header from "./Header";

const MySwal = withReactContent(Swal);

function CreateUser() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [department, setDepartment] = useState('Pick one');
  const [email, setEmail] = useState('');

  const CreateUser = () => {
    axios.post('http://localhost:3333/api/users', {fullname, department, email})
    .then((response) => {
      if (response.data.code === 'SUCCESS') {
        MySwal.fire({
          icon: 'success',
          title: 'Create successfully',
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/');
        })
      }
    })
  }

  return (
    <>
        <Header/>
        <section className="flex justify-center items-center">
          <div className="card card-compact w-1/2 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title"><i className="bi bi-person-plus-fill"></i> Create User</h2>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Fullname</span>
                </div>
                <input type="text"
                  className="input input-bordered w-full"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
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
                    <option disabled defaultValue>Pick one</option>
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
                  type="text"
                  className="input input-bordered w-full"
                  value={email}
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <div className="card-actions justify-end mt-3">
                <button className="btn btn-primary w-full" onClick={CreateUser}>Create User</button>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default CreateUser