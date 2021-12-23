import './Fotter.css'
import { Link } from 'react-router-dom'
const Fotter = () => {

    const d = new Date()
    return (
        <div className="footer-dark">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <img src="/Gimage/fa.png" alt="logo" className="fotter-image" />
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>About</h3>
                            <ul>
                                <li><a href="/company">Company</a></li>
                                <li><a href="/company">Team</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>Avrnikh</h3>
                            <p>Avrnikh entails tasks and processes to develop
                                and implement growth opportunities within and
                                between organizations.It is a subset of the fields
                                of business, commerce and organizational theory.</p>
                        </div>
                        <div className="col item social">
                            <Link to={{ pathname: "https://www.facebook.com/" }} target="_blank" ><i className="fab fa-facebook"></i></Link>
                            <Link to={{ pathname: "https://twitter.com/"}} target="_blank"><i className="fab fa-twitter"></i></Link>
                            <Link to={{ pathname: "https://www.snapchat.com/" }} target="_blank"><i className="fab fa-snapchat"></i></Link>
                            <Link to={{ pathname: "https://www.instagram.com/" }} target="_blank"><i className="fab fa-instagram"></i></Link>
                        </div>
                    </div>
                    <p className="copyright">Avrnikh © {d.getFullYear()}</p>
                </div>
            </footer>
        </div>
    )
}
export default Fotter;
