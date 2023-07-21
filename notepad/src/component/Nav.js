import { React } from 'react'
import { useLocation } from 'react-router-dom';

export default function Nav() {
    let location = useLocation();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/"><strong>Notepad</strong></a>

                <ul className="navbar-nav">
                    <li className="nav-item active" type="none"  style={{ borderBottom: (location.pathname === "/home" ? "2px solid rgb(0, 0, 0)" : "") }} >
                        <a className="nav-link" href="/home" >Home</a>
                    </li>
                    <li className="nav-item" type="none"  style={{ borderBottom: (location.pathname === "/addnote" ? "2px solid rgb(0, 0, 0)" : "") }}>
                        <a className="nav-link" href="/addnote" >Addnote</a>
                    </li>
                    <li className="nav-item" type="none" style={{ borderBottom: (location.pathname === "/login" ? "2px solid rgb(0, 0, 0)" : "") }}>
                        <a className="nav-link" href="/login">Login/singup</a>
                    </li>
                </ul>

            </nav>
        </>
    )
}
