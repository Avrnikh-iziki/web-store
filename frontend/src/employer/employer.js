
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Fotter2 from "../components/Fotter2"
import { Link } from 'react-router-dom';
import Loadingpopup from '../popup/Loadingpopup'

const Employer = () => {

    const [name, setname] = useState("");
    const [detail, setdetail] = useState("");
    const [data, setdata] = useState("")
    const [url, seturl] = useState("")
    const [previewsource, setpreviewsource] = useState("")
    const [loading, setloading] = useState(true)
    const [progress, setprogress] = useState(0)

    const [nameerr, setnameerr] = useState("");
    const [detailerr, setdetailerr] = useState("");
    const [imageerr, setimageerr] = useState("");
    const [success, setsuccess] = useState("");
    const [successerr, setsuccesserr] = useState("");
    const [employer, setemployer] = useState([])


    useEffect(() => {
        try {
            axios
                .get("/api/employer")
                .then(res => {
                    const { employer } = res.data
                    setemployer(employer)
                })
        } catch (err) {
            console.log(err)
        }

    }, [])

    const onchangename = (e) => {
        if (e.target.value.length < 20) {
            setname(e.target.value)
        }
    }

    const onchangedetails = (e) => {
        if (e.target.value.length < 1000) {
            setdetail(e.target.value)
        }
    }

    const onChangeimage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setpreviewsource(reader.result)
            setdata(file)
        }
    }

    const uploadimage = (e) => {
        e.preventDefault()
        const config = {
            onUploadProgress: progressEvent => {
                setprogress(Math.round(progressEvent.loaded * 100.0 / progressEvent.total))
            }
        }
        const formData = new FormData();
        formData.append("file", data);
        formData.append("upload_preset", "shopavrnikh");
        formData.append("tags", `codeinfuse, medium, gist`);
        formData.append("api_key", "484167425915861");
        formData.append("timestamp", (Date.now() / 1000) | 0);
        axios.post("https://api.cloudinary.com/v1_1/dcvbwv6rk/image/upload/", formData, config)
            .then(res => {
                if (res.data) {
                    const { url } = res.data
                    seturl(url)
                    setloading(false)
                }
            })
    }

    const deleteimage = () => {
        setprogress("")
        setdata('')
    }

    const onSubmit = () => {

        const employer = {
            name: name,
            detail: detail,
            url: url
        }


        try {
            axios
                .post("/api/employer", employer)
                .then(res => {

                    const { errs, success } = res.data
                    if (errs) {
                        if (errs.name) setnameerr(errs.name)
                        if (errs.detail) setdetailerr(errs.detail)
                        if (errs.image) setimageerr(errs.image)
                    }
                    if (success) {
                        if (success.success) setsuccess(success.success)
                        if (success.err) setsuccesserr(success.err)
                    }
                    setTimeout(() => {
                        if (success) {
                            window.location = "/employer"
                        } else {
                            setnameerr("")
                            setdetailerr("")
                            setimageerr("")
                        }
                    }, 2000);
                });
        } catch (err) { console.log(err) }
    }

    const deleteemployer = (id) => {
        axios
            .post('/api/employer/' + id)
            .then(res => {
                const { success } = res.data
                if (success) {
                    if (success.err) setsuccesserr(success)
                    if (success.success) setsuccess(success.success)
                }
                setTimeout(() => {
                    setsuccess("")
                    setsuccesserr("")
                }, 2000)
            })
        setemployer(employer.filter(el => el._id !== id))
    }

    return ((employer === undefined || employer === "")
        ? <Loadingpopup />
        : <>
            <div className="container w-75 mb-3 b">
                {success && <div className="success-message"><i className="fas fa-check"></i>{success}</div>}
                {successerr && <div className="err-message"><i className="fas fa-times"></i>{successerr}</div>}
                <h3>Company detail </h3>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={onchangename} />
                        {nameerr && <div className="err-message"><i className="fas fa-times"></i>{nameerr}</div>}
                    </div>
                    <div className="form-group">
                        <label>details</label>
                        <textarea

                            className="form-control"
                            value={detail}
                            onChange={onchangedetails}
                            style={{ height: "100px" }}
                        />
                        {detailerr && <div className="err-message"><i className="fas fa-times"></i>{detailerr}</div>}
                    </div>


                    <div className="form-group row mt-2">

                        <div className="col-sm-3 mt-2 ">
                            {data
                                ? <button type="button" className="btn btn-success but" onClick={uploadimage}>Upload Image</button>
                                : <button type="button" className="btn btn-success but disabled" onClick={uploadimage}>Upload Image</button>
                            }
                        </div>
                        <div className="col-sm-9 mt-1">
                            <input
                                type="file"
                                name="image"
                                accept="image/png, image/gif, image/jpeg , image/HEIC"
                                className="form-control"
                                onChange={onChangeimage}
                            />
                        </div>
                    </div>
                    {imageerr && <div className="err-message"><i className="fas fa-times"></i>{imageerr} </div>}
                    {
                        data &&
                        <div className="image_in1 mt-3 mb-3 pt-3 pb-1">
                            <div
                                style={{ backgroundImage: `url(${previewsource})`, backgroundSize: "100%  100%", backgroundRepeat: "no-repeat" }}
                                className="load-in">
                                <div className="progress">
                                    <div
                                        className="del"
                                        onClick={() => deleteimage()}>
                                        {
                                            loading &&
                                            <span>
                                                <i className="fas fa-times"></i>
                                            </span>
                                        }
                                    </div>
                                    <div className="pro">
                                        {
                                            (loading && progress) &&
                                            <progress
                                                value={progress}
                                                max="100"> {progress}
                                            </progress>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                      {!loading && <span>(1)-image uploded</span>}
                    <div className="form-group mt-3">
                        <input type="button" value="ADD COMPANY DETAIL" className="btn btn-primary" onClick={onSubmit} />
                    </div>
                </form>

                <hr />
                <h3> your employers</h3>
                <div className="tbl">
                    <table className="ta table table-dark">
                        <thead>
                            <tr>
                                <th> Employer</th>
                                <th> Remove </th>

                            </tr>
                        </thead>
                        <tbody>
                            {employer.map((value, index) => (
                                <tr key={index}>
                                    <td>{value.name}</td>
                                    <td>
                                        <Link className="l" to="#" onClick={() => deleteemployer(value._id)}>Remove</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Fotter2 />
        </>
    )
}

export default Employer;