import './Fotter.css'
const Fotter2= () => {
    const d = new Date()
    return (
        <div className="footer-dark1">
            <footer>
                Avrnikh © {d.getFullYear()}
            </footer>
        </div>
    )
}
export default Fotter2;