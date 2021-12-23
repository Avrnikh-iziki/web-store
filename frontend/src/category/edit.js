import './category.css';
import axios from 'axios';
import React, { Component } from 'react';
import Fotter2 from '../components/Fotter2'

class editCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            image: '',
            data: "",
            previewsource: '',
            imaerr: "",
            catyerr: "",
            success: "",
            url: "",
            progress: 0,
            loading: true,
        }
    }
    componentDidMount() {
        axios.get('/api/category/' + this.props.match.params.id)
            .then(res => {
                const { category, slage, image } = res.data
                this.setState({
                    category: category,
                    slage: slage,
                    image: image
                })
            })
            .catch((error) => console.log(error))
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

    deleteimage = () => {
        this.setState({
            previewsource: '',
            data: ''
        })
    }
    onSubmit = e => {
        e.preventDefault();
        const caty = {
            category: this.state.category,
            url: this.state.url,
        }

        try {
            axios
                .post("/api/category/update/" + this.props.match.params.id, caty)
                .then(res => {
                    this.setState({
                        imaerr: res.data.errs !== undefined
                            ? res.data.errs.image
                            : "",
                        catyerr: res.data.errs !== undefined
                            ? res.data.errs.category
                            : "",
                        success: res.data.success !== undefined
                            ? res.data.success.category
                            : "",
                    })

                    setTimeout(() => {
                        if (this.state.success) {
                            window.location = "/category"
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
    render() {
        return (
            <>
                <div className="container w-50 mb-3 b">
                    {this.state.success && <div className="success-message"><i className="fas fa-check"></i>{this.state.success}</div>}
                    <h3> Update Category </h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Category </label>
                            <input
                                type="text"
                                disabled
                                className="form-control"
                                value={this.state.category} />
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
                            this.state.data
                                ? <div className="image_in1 mt-3 mb-3 pt-3 pb-1">
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
                                : <img src={this.state.image} className=".lod-image" alt="last-pic" />
                        }
                        {
                            !this.state.loading &&
                            <span>(1)-image uploded</span>
                        }

                        <hr />
                        <div className="form-group mt-3">
                            <input type="submit" value="UPDATE CATEGORY" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                <Fotter2 />
            </>
        )
    }
}
export default editCategory;