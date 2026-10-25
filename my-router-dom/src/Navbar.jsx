import {Link} from "react-router-dom";

function Navbar() {
    return (
        <div>
            <Link to="/"> Home </Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
        </div>
    )
}
export default Navbar;