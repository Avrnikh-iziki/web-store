import { useState } from 'react';
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer';
import Backdrop from '../components/Backdrop';

const NaveScreen = ({ setcaty, category }) => {
    const [sideToggle, setSideToggle] = useState(false);

    const change = e => {
        e.preventDefault()
        setSideToggle(!sideToggle)
    }

    return (
        <>
            <Navbar click={change} setcaty={setcaty} category={category} />
            <SideDrawer show={sideToggle} click={change} setcaty={setcaty} category={category} />
            <Backdrop show={sideToggle} click={change} />
        </>
    )

}
export default NaveScreen;