import React, {useEffect, useContext} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import {AuthContext} from "../context/auth/authContext";
import {NotifyContext} from "../context/notify/notifyContext";
import {NoteContext} from "../context/note/noteContext";

export const Navbar = () => {
    const {token, user, logout} = useContext(AuthContext)
    const {notify} = useContext(NotifyContext)
    const {releaseNotes} = useContext(NoteContext)
    const history = useHistory()

    useEffect(() => {
        if(!token || !user) {
            history.push('/sign-in')
        }
    }, [])

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <NavLink
                className="navbar-brand"
                to={'/'}
                exact
            >
                React App
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to={'/'}
                            exact
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to={'/about'}
                            exact
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
                { (!token) ? (
                    <ul className="navbar-nav ml-md-auto d-none d-flex">
                        <li className="nav-item">
                            <NavLink
                                className="btn btn-outline-success"
                                to={'/sign-in'}
                                exact
                            >
                                Sign in
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to={'/sign-up'}
                                exact
                            >
                                Sign up
                            </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav ml-md-auto d-none d-flex">
                        <li className="nav-item dropdown">
                            <a className="nav-item nav-link dropdown-toggle mr-md-2 user-name" href="#" id="bd-versions"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                {user ? user.name : 'None'}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
                                <a
                                    href="#"
                                    className="dropdown-item"
                                    onClick={
                                        () => logout().then(response => {
                                            releaseNotes()
                                            notify({status:'success', message:`Goodbye, ${user.name}`})
                                        }).catch(error => {
                                            notify({status:'danger', message: error.response.data})
                                        })
                                    }
                                >
                                    Sign out
                                </a>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}
