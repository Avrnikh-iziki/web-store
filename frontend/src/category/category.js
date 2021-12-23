import './category.css'
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fotter2 from "../components/Fotter2"

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            categorys: [],
            data: "",
            imaerr: "",
            catyerr: "",
            success: "",
            previewsource: '',
            url: "",
            loading: true,
            progress: 0,
        }
    }
    componentDidMount() {
        axios.get('/api/category')
            .then(response => this.setState({ categorys: response.data }))
            .catch((error) => console.log(error))
    }

    onChangecategory = e => {
        if (e.target.value.length <= 15) this.setState({ category: e.target.value })
    }

    onChangeimage = e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            this.setState({
                previewsource: reader.result,
                data: file
            })
        }
    }

    uploadimage = (e) => {
        e.preventDefault()
        const config = {
            onUploadProgress: progressEvent => {
                this.setState({
                    progress: Math.round(progressEvent.loaded * 100.0 / progressEvent.total)
                })
            }
        }
        const formData = new FormData();
        formData.append("file", this.state.data);
        formData.append("upload_preset", "shopavrnikh");
        formData.append("tags", `codeinfuse, medium, gist`);
        formData.append("api_key", "484167425915861");
        formData.append("timestamp", (Date.now() / 1000) | 0);
        axios.post("https://api.cloudinary.com/v1_1/dcvbwv6rk/image/upload/", formData, config)
            .then(res => {
                if (res.data) {
                    const { url } = res.data
                    this.setState({
                        url: url,
                        loading: false
                    })
                }
            })
    }

    deleteimage = () => {
        this.setState({
            previewsource: '',
            data: ''
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        const categor = {
            category: this.state.category,
            url: this.state.url
        }

        try {
            axios
                .post("/api/category", categor)
                .then(res => {
                    const { errs, success } = res.data
                    this.setState({
                        imaerr: errs !== undefined
                            ? errs.image
                            : "",
                        catyerr: errs !== undefined
                            ? errs.category
                            : "",
                        success: success !== undefined
                            ? success.category
                            : "",
                    })
                    setTimeout(() => {
                        if (this.state.success) {
                            window.location = "/product"
                        } else {
                            this.setState({
                                imaerr: "",
                                catyerr: "",
                                success: "",
                            });
                        }
                    }, 2000);
                });
        } catch (err) { console.log(err) }
    }
    deletecategory(category) {
        axios
            .post("/api/category/" + category)
            .then(res => {
                console.log(res.data.success)
                this.setState({
                    success: res.data.success !== undefined
                        ? res.data.success
                        : ""
                })
                setTimeout(() => {
                    this.setState({
                        success: ""
                    })
                }, 2000)
            });
        this.setState({ categorys: this.state.categorys.filter(el => el.category !== category) })
    }

    render() {
        var data = this.state.categorys;
        return (
            <>
                <div className="container w-75 mb-3 b">
                    {this.state.success && <div className="success-message"><i className="fas fa-check"></i>{this.state.success}</div>}
                    <h3>Add new Category </h3>
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label>Category </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.category}
                                onChange={this.onChangecategory} />
                        </div>
                        {this.state.catyerr && <div className="err-message"><i className="fas fa-times"></i>{this.state.catyerr}</div>}

                        <div className="form-group row mt-2">

                            <div className="col-sm-3 mt-2 ">
                                {this.state.data
                                    ? <button type="button" className="btn btn-success but" onClick={this.uploadimage}>Upload Image</button>
                                    : <button type="button" className="btn btn-success but disabled" onClick={this.uploadimage}>Upload Image</button>
                                }
                            </div>
                            <div className="col-sm-9 mt-1">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/png, image/gif, image/jpeg , image/HEIC"
                                    className="form-control"
                                    onChange={this.onChangeimage}
                                />
                            </div>
                        </div>

                        {this.state.imaerr && <div className="err-message"><i className="fas fa-times"></i>{this.state.imaerr} </div>}
                        {
                            this.state.data &&
                            <div className="image_in1 mt-3 mb-3 pt-3 pb-1">
                                <div
                                    style={{ backgroundImage: `url(${this.state.previewsource})`, backgroundSize: "100%  100%", backgroundRepeat: "no-repeat" }}
                                    className="load-in">
                                    <div className="progress">
                                        <div
                                            className="del"
                                            onClick={() => this.deleteimage()}>
                                            {
                                                this.state.loading &&
                                                <span>
                                                    <i className="fas fa-times"></i>
                                                </span>
                                            }
                                        </div>
                                        <div className="pro">
                                            {
                                                (this.state.loading && this.state.progress !== 0) &&
                                                <progress
                                                    value={this.state.progress}
                                                    max="100"> {this.state.progress}
                                                </progress>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {!this.state.loading && <span>(1)-image uploded</span>}
                        <hr />
                        <div className="form-group mt-1 mb-4 pb-4">
                            <input type="submit" value="ADD CATEGORY" className="btn btn-primary" />
                        </div>
                    </form>

                    <h3>your Ctegories</h3>
                    <div className="tbl">
                        <table className="ta table table-dark">
                            <thead>
                                <tr>
                                    <th> Catygory</th>
                                    <th> Edit </th>
                                    <th> Remove </th>

                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.category}</td>
                                        <td>
                                            <Link to={"/editCategory/" + value._id} className="text-decoration-none l">Edit</Link>
                                        </td>
                                        <td>
                                            <Link className="l" to="#" onClick={() => this.deletecategory(value.category)}>Remove</Link>
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
}
export default Category;