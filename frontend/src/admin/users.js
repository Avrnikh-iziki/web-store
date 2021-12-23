import './users.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Fotter2 from '../components/Fotter2'
import Loadingpopup from '../popup/Loadingpopup'

const Users = ({ u }) => {
    const [user, setuser] = useState([])
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [del_err, setdel_err] = useState('');
    const [del_success, setdel_success] = useState("");
    const [reg_success, setreg_success] = useState("");
    const [passreg_err, setpassreg_err] = useState("");
    const [userreg_err, setuserreg_err] = useState("");


    useEffect(() => {
        axios
            .get("/api/admin/user")
            .then(res => {
                if (res) {
                    const da = res.data
                    setuser(da)
                }
            });
    }, [])

    const register = (e) => {
        const data = {
            username: name,
            password: password,
        }
        axios
            .post("/api/admin/register", data)
            .then((res) => {
                const { errs, success } = res.data
                if (errs) {
                    if (errs.user) setuserreg_err(errs.user)
                    if (errs.password) setpassreg_err(errs.password)
                }
                if (success) setreg_success(success)
                setTimeout(() => {
                    if (success) {
                        window.location = "/users"
                    } else {
                        setuserreg_err("")
                        setpassreg_err("")
                        setreg_success("")
                    }
                }, 2000)
            });
    };
    const remove = (e,id) => {
        e.preventDefault()
        setuser(user.filter(us=> us._id !== id ))  
        axios
            .post("/api/admin/register/" + id)
            .then((res) => {
                const { faild, success } = res.data
                if (faild) setdel_err(faild);
                if (success) setdel_success(success);

                setTimeout(() => {
                    if (success) {
                        setdel_success("")
                        window.location = "/product"
                    } else {
                        setdel_err("")
                        setdel_success("")
                    }
                }, 2000);
            })
    }
    return (
        < >
            {(user.length  === 0)
                ? <Loadingpopup />
                :
                <div className="container main"> 
                    {u === user[0]._id &&
                        <> <div className="user-form">
                            {reg_success && <div className="success-message"><i className="fas fa-check"></i>{reg_success}</div>}
                            <div className="form-group ">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)} />
                                {userreg_err && <div className="err-message"><i className="fas fa-times"></i>{userreg_err}</div>}

                            </div>
                            <div className="form-group mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)} />
                                {passreg_err && <div className="err-message"><i className="fas fa-times"></i>{passreg_err}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <input type="button" value="ADD USER" onClick={(e) => register(e)} className="btn btn-primary" />
                            </div>
                        </div>
                            <hr />
                        </>
                    }
                    <div style={{ marginTop: "30px" }}>
                        <h3>Users</h3>
                        {del_err && <div className="err-message"><i className="fas fa-times"></i>{del_err}</div>}
                        {del_success && <div className="success-message"><i className="fas fa-check"></i>{del_success}</div>}
                        <div className="tbl">
                            <table className="ta table table-dark">
                                <thead>
                                    <tr>
                                        <th> Users name</th>
                                        <th> Edit </th>
                                        <th> Remove </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.map((value, index) => (
                                        u === user[0]._id
                                            ? (
                                                index !== 0
                                                    ?
                                                    <tr key={index}>
                                                        <td>{value.username}</td>
                                                        <td><Link to={"/editusers/" + value._id} className="text-decoration-none l">Edit</Link></td>
                                                        <td><Link className="l" to="#" onClick={(e) => remove(e,value._id)}>Remove</Link></td>
                                                    </tr>
                                                    : <tr key={index}>
                                                        <td>{value.username}</td>
                                                        <td><Link to={"/editusers/" + value._id} className="text-decoration-none l">Edit</Link></td>
                                                        <td style={{ color: "rgba(255,255,255,0.3)" }}>Remove</td>
                                                    </tr>
                                            )
                                            : u !== value._id
                                                ? <tr key={index}>
                                                    <td>{value.username}</td>
                                                    <td style={{ color: "rgba(255,255,255,0.3)" }}>Edit</td>
                                                    <td style={{ color: "rgba(255,255,255,0.3)" }}>Remove</td>
                                                </tr>
                                                : <tr key={index}>
                                                    <td>{value.username}</td>
                                                    <td><Link to={"/editusers/" + value._id} className="text-decoration-none l">Edit</Link></td>
                                                    <td><Link className="l" to="#" onClick={(e) => remove(e,value._id)}>Remove</Link></td>
                                                </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
            <Fotter2 />
        </>
    )
}
export default Users;