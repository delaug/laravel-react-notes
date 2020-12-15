import React, {useState, useContext} from 'react'
import {AuthContext} from "../../context/auth/authContext";
import {NotifyContext} from "../../context/notify/notifyContext";

const useRegistrationForm = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        device_name: navigator.userAgent,
    })

    const [errors, setErrors] = useState({})
    const [isLoading, setLoading] = useState(false)
    const {register} = useContext(AuthContext)
    const {notify} = useContext(NotifyContext)

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        let errors = validateValues(values)
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            setLoading(true)
            register(values)
                .then(response => {
                    setLoading(false)
                    notify({status:'success', message:`Welcome, ${response.data.user.name}`})
                })
                .catch(error => {
                    setLoading(false)
                    notify({status:'danger', message: error.response.data.error})
                })
        }
    }

    const validateValues = values => {
        let errors = {}

        if (!values.name.trim()) {
            errors.name = 'Name is required'
        }

        if (!values.email) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid'
        }

        if (!values.password) {
            errors.password = 'Password is required'
        } else if (values.password.length < 6) {
            errors.password = 'Password must be more than 6 characters'
        }

        if (!values.password_confirmation) {
            errors.password_confirmation = 'Password confirm is required'
        } else if (values.password_confirmation !== values.password) {
            errors.password_confirmation = 'Passwords do not match'
        }

        return errors
    }

    return {values, errors, isLoading, handleChange, handleSubmit}
}

export const RegistrationForm = () => {
    const {values, errors, isLoading, handleChange, handleSubmit} = useRegistrationForm()

    return (
        <div>
            <form className="form-signup">
                <div className="text-center">
                    <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={"form-control " + (errors.name && "is-invalid")}
                        placeholder="Name"
                        autoFocus=""
                        value={values.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={"form-control " + (errors.email && "is-invalid")}
                        placeholder="Email address"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={"form-control " + (errors.password && "is-invalid")}
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirmation" className="sr-only">Password confirm</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        className={"form-control " + (errors.password_confirmation && "is-invalid")}
                        placeholder="Password confirm"
                        value={values.password_confirmation}
                        onChange={handleChange}
                    />
                    {errors.password_confirmation &&
                    <div className="invalid-feedback">{errors.password_confirmation}</div>}
                </div>
                { !isLoading ? (
                    <button
                        className="btn btn-md btn-primary btn-block"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>
                ) : (
                    <button className="btn btn-primary btn-block" type="button" disabled>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        &nbsp;Loading...
                    </button>
                )}

            </form>
        </div>

    )
}
