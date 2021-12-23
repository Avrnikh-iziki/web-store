import './users.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Fotter2 from '../components/Fotter2';
import Loadingpopup from '../popup/Loadingpopup';

const Editusers = (props) => {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [password2, setpassword2] = useState(''); 

    const [pass1_err, setpass1_err] = useState("");
    const [pass2_err, setpass2_err] = useState("");
    const [name_err, setname_err] = useState("");

    const [edit_success, setedit_sucess] = useState("");
    const [edit_err, setedit_err] = useState("");

    const [loading, setloading] = useState(true)


    useEffect(() => {
        axios
            .get("/api/admin/user/" + props.match.params.id)
            .then(res => {
                setTimeout(() => {
                    if (res.data.username) {
                        setname(res.data.username)
                        setloading(false)
                    }
                }, 1)
            });
    }, [props.match.params.id])

    const register = (e) => {
        e.preventDefault();
        const data = {
            username: name,
            password: password,
            password2: password2,
        }
        axios
            .post("/api/admin/user/" + props.match.params.id, data)
            .then((res) => {

                const { errs, success } = res.data
                if (errs) {
                    if (errs.user) setname_err(errs.user)
                    if (errs.pass1) setpass1_err(errs.pass1)
                    if (errs.pass2) setpass2_err(errs.pass2)
                }
                if (success) {
                    if (success.success) setedit_sucess(success.success)
                    if (success.err) setedit_err(success.err)
                }
                setTimeout(() => {
                    if (success) {
                        window.location = "/product"
                    } else {
                        setname_err("")
                        setpass1_err("")
                        setpass2_err("")
                        setedit_err("")
                        setedit_sucess("")
                    }
                }, 2000)
            });
    };
    return (
        <>
            {loading
                ? <Loadingpopup />
                : <div className="container  main2">
                    {edit_success && <div className="success-message"><i className="fas fa-check"></i>{edit_success}</div>}
                    {edit_err && <div className="err-message"><i className="fas fa-times"></i>{edit_err}</div>}

                    <div className="user-form">
                        <div className="form-group ">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setname(e.target.value)} />
                            {name_err && <div className="err-message"><i className="fas fa-times"></i>{name_err}</div>}

                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)} />
                            {pass1_err && <div className="err-message"><i className="fas fa-times"></i>{pass1_err}</div>}

                        </div>
                        <div className="form-group mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last Password"
                                value={password2}
                                onChange={(e) => setpassword2(e.target.value)} />
                            {pass2_err && <div className="err-message"><i className="fas fa-times"></i>{pass2_err}</div>}

                        </div>
                        <div className="form-group mt-3">
                            <input type="button" value="UPDATE USER" onClick={(e) => register(e)} className="btn btn-primary" />
                        </div>

                    </div>
                </div>
            }
            <Fotter2 />
        </>
    )
}
export default Editusers;