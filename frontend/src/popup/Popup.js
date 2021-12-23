import React, { useState } from 'react';
import './Popup.css';
import axios from 'axios';


function Popup({ show, setshow, cart, resetcart }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [adress, setAdress] = useState("")
    const [city, setCity] = useState("")
    const [zip, setZip] = useState("")


    const [name_err, setName_err] = useState("")
    const [email_err, setEmail_err] = useState("")
    const [phone_err, setPhone_err] = useState("")
    const [adress_err, setAdress_err] = useState("")
    const [city_err, setCity_err] = useState("")
    const [zip_err, setZip_err] = useState("")
    const [err, seterr] = useState("")
    const [success, settsuccess] = useState("")




    const hnadleName = e => { setName(e.target.value) }
    const hnadlemail = e => setEmail(e.target.value)
    const handlecity = e => setCity(e.target.value)
    const hnadlephone = e => setPhone(e.target.value)
    const hnadleadress = e => setAdress(e.target.value)
    const hnadlezip = e => setZip(e.target.value)

    const send = e => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            phone: phone,
            adress: adress,
            city: city,
            zip: zip,
            cart: cart
        }
        try {
            axios
                .post("/api/email/send", data)
                .then(res => {
                    const { errs, success } = res.data
                    if (errs) {
                        if (errs.name) setName_err(errs.name)
                        if (errs.email) setEmail_err(errs.email)
                        if (errs.phone) setPhone_err(errs.phone)
                        if (errs.adress) setAdress_err(errs.adress)
                        if (errs.city) setCity_err(errs.city)
                        if (errs.zip) setZip_err(errs.zip)
                    }
                    if (success) {
                        if (success.err) seterr(success.err)
                        if (success.success) settsuccess(success.success)
                    }

                    setTimeout(() => {
                        if (success) {
                            if(success.success) resetcart()
                            window.location = "/"
                        } else {
                            setName_err("")
                            setEmail_err("")
                            setPhone_err("")
                            setAdress_err("")
                            setCity_err("")
                            setZip_err("")
                            seterr("")
                            settsuccess("")
                        }
                    }, 2000)
                });
        } catch (err) { console.log(err) }
    }

    return show && (
        <div className="popup">
            <div className="popup-inner">
                <div className="close"
                    onClick={() => setshow(false)}>
                    <i className="fas fa-times"></i>
                </div>
                {success && <div className="success-message11"><i className="fas fa-check"></i>{success}</div>}
                {err && <div className="err-message11"><i className="fas fa-times"></i>{err}</div>}
                <form >
                    <div className="respon">
                        <div>
                            <div className="form-row mb-2 ">
                                <div className="form-group col-md-12">
                                    <input type="text"
                                        className="form-control"
                                        id="inputName"
                                        placeholder="Name"
                                        onChange={hnadleName} />
                                    {name_err && <div className="err-message11"><i className="fas fa-times"></i>{name_err}</div>}

                                </div>
                            </div>
                            <div className="form-row mb-2">
                                <div className="form-group col-md-12">
                                    <input type="email"
                                        className="form-control"
                                        id="inputEmail4"
                                        placeholder="Email"
                                        onChange={hnadlemail} />
                                    {email_err && <div className="err-message11"><i className="fas fa-times"></i>{email_err}</div>}

                                </div>
                            </div>
                            <div className="form-row mb-2">
                                <div className="form-group col-md-12">
                                    <input type="Phone"
                                        className="form-control"
                                        id="inputPhone"
                                        placeholder="Phone"
                                        onChange={hnadlephone} />
                                    {phone_err && <div className="err-message11"><i className="fas fa-times"></i>{phone_err}</div>}

                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <div className="form-group col-md-12">
                                    <input type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="Adress"
                                        onChange={hnadleadress} />
                                    {adress_err && <div className="err-message11"><i className="fas fa-times"></i>{adress_err}</div>}

                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="form-row">
                                <div className="form-group col-md-12 mb-2">
                                    <input type="text"
                                        className="form-control"
                                        id="inputCity"
                                        placeholder="City"
                                        onChange={handlecity} />
                                    {city_err && <div className="err-message11"><i className="fas fa-times"></i>{city_err}</div>}

                                </div>
                                <div className="form-group col-md-6 mb-4">
                                    <input type="text"
                                        className="form-control"
                                        id="inputZip"
                                        placeholder="Zip"
                                        onChange={hnadlezip} />
                                    {zip_err && <div className="err-message11"><i className="fas fa-times"></i>{zip_err}</div>}

                                </div>
                            </div>
                            <div className="sub">
                                <input type="button"
                                    value="SEND"
                                    className="form-control "
                                    onClick={send} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>)

};
export default Popup;