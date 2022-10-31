import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import { login,addNewUser } from '../../actions/actionLogin.js'

import './login.css'

const LoginPage = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [newUserData, setNewUserData] = useState({
        name: "",
        username: "",
        password: ""
    });
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');

    useEffect(() => {
        if (props.loginState.authenticated === true) {
            navigate("/home")
        }

    }, [props])

    const onHide = (name) => {
        setDisplayResponsive(false);
    }

    const onClick = (name, position) => {
        setDisplayResponsive(true);

        if (position) {
            setPosition(position);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.login(formData);
    }

    const addNewUser = (e) => {
        props.addNewUser(newUserData);
        setDisplayResponsive(false);
    }


    return (
        <div >
            <Dialog visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '27vw' }}>
                <div>
                    <div className="form-demo">
                        <div className="flex justify-content-center">
                            <div className="card">
                                <h1 className="text-center">New User</h1>
                                <form onSubmit={() => addNewUser()} className="p-fluid">
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText
                                                autoFocus
                                                value={newUserData.name}
                                                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })} />
                                            <label htmlFor="name" >Name</label>
                                        </span>
                                    </div>


                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText
                                                value={newUserData.username}
                                                onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })} />
                                            <label htmlFor="name" >Username</label>
                                        </span>
                                    </div>

                                    <div className="field mt-3">
                                        <span className="p-float-label">
                                            <Password
                                                feedback={false}
                                                toggleMask
                                                value={newUserData.password}
                                                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} />
                                            <label htmlFor="password">Password</label>
                                        </span>
                                    </div>





                                    <Button type="submit" label="Salvar" className="mt-2" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

            <div className="form-demo">
                <div className="flex justify-content-center">
                    <div className="card">
                        <h1 className="text-center">Login</h1>
                        <form onSubmit={onSubmit} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText
                                        autoFocus
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                                    <label htmlFor="name" >Username</label>
                                </span>
                            </div>

                            <div className="field mt-3">
                                <span className="p-float-label">
                                    <Password
                                        feedback={false}
                                        toggleMask
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                    <label htmlFor="password">Password</label>
                                </span>
                            </div>

                            <a href='#' onClick={() => onClick()}>
                                <h5>
                                    Novo Usuario
                                </h5>
                            </a>


                            <Button type="submit" label="Login" className="mt-2" />
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

const mapStateProps = (state) => {
    return {
        loginState: state.loginReducer
    }
}

const mapDispacthToProps = {
    login,
    addNewUser
}

export default connect(mapStateProps, mapDispacthToProps)(LoginPage)