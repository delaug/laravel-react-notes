import React, {useContext} from 'react'
import {Route, Switch, Redirect} from "react-router-dom";
import {Home} from "../pages/Home";
import {About} from "../pages/About";
import {SignIn} from "../pages/SignIn";
import {SignUp} from "../pages/SignUp";
import {Notify} from "./notify/Notify";
import {AuthContext} from "../context/auth/authContext";

export const Content = () => {
    const {token,user} = useContext(AuthContext)

    return (
        <main className="flex-shrink-0">
            <Notify/>
            <div className="container p-lg-4">
                <Switch>
                    <Route path={'/'} exact component={Home}/>
                    <Route path={'/about'} exact component={About}/>
                    <Route path={'/sign-in'} exact>
                        {(token && user) ? <Redirect to="/" /> : <SignIn />}
                    </Route>
                    <Route path={'/sign-up'} exact>
                        {(token && user) ? <Redirect to="/" /> : <SignUp />}
                    </Route>
                </Switch>
            </div>
        </main>
    )
}
