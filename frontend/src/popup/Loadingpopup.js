import './Loadingpopup.css';
import { useEffect} from 'react'
function Loadingpopup() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return <div className="popup1">
        <div className="popup-inner1">
            <div className=" one 1"></div>
            <div className=" one 2"></div>
            <div className=" one 3"></div>
            <div className=" one 2"></div>
            <div className=" one 3"></div>
           
        </div>
    </div>
}
export default Loadingpopup;