import React, {useContext} from 'react'
import {NotifyContext} from "../../context/notify/notifyContext";

export const Notify = () => {
    const {visible, message, status, hideNotify} = useContext(NotifyContext)

    if (!visible) return null

    return (
        <div style={{
            position: 'fixed',
            zIndex: 1000,
            width: '100%',
            top: '5px'
        }}>
            <div className="container p-lg-4">
                <div
                    onClick={hideNotify}
                    className={'alert alert-' + status + ' alert-dismissible fade show'}
                >
                    <strong>{status.charAt(0).toUpperCase() + status.slice(1)}</strong>. {message}.
                    <button type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>


    )
}
