/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import {Footer} from "./components/Footer";

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import {Header} from "./components/Header";
import {Content} from "./components/Content";
import {NoteState} from "./context/note/NoteState";
import {NotifyState} from "./context/notify/NotifyState";
import {AuthState} from "./context/auth/AuthState";

function App() {
    return (
        <AuthState>
            <NotifyState>
                <NoteState>
                    <BrowserRouter>
                        <Header/>
                        <Content/>
                        <Footer/>
                    </BrowserRouter>
                </NoteState>
            </NotifyState>
        </AuthState>
    );
}

export default App;

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

