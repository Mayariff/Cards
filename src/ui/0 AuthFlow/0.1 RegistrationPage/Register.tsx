import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import styles from './Register.module.css'
import {useDispatch} from "react-redux";
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../../bll/store";
import {ErrorSnackbar} from "../../7 CommonComponents/7.4 ErrorSnackbar/ErrorSnackbar";
import {PATH} from "../../Routes/Routes";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import PaperContainer from "../../8 Helpers & Visual Components/8.3 Visual/8.3.1 PaperContainer/PaperContainer";
import {registerTC} from "../../../bll/reducers/loginReducer";
import style from "../0.2 LoginPage/Login.module.css";
import ReusablePasswordInput from "../../8 Helpers & Visual Components/8.3 Visual/8.3.3 ReusablePasswordInput/ReusablePasswordInput";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

export const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isRegister = useAppSelector<boolean>(state => state.Login.isRegister)
    const isLoading = useAppSelector<RequestStatusType>(state => state.App.status)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [submitted, setSubmitted] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)

    const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setSubmitted(false)
    }, [setEmail, setSubmitted])
    const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setSubmitted(false)
        setError(null)
    }, [setPassword, setSubmitted])
    const handleConfirmPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value)
        setSubmitted(false)
        setError(null)
    }, [setConfirmPassword, setSubmitted])
    const handleSubmit = () => {
        if (password === confirmPassword) {
            dispatch(registerTC({email, password}))
            setSubmitted(true)
        } else {
            setError('Passwords are different')
        }
    }
    useEffect(() => {
        dispatch(setAppErrorAC(null))
        if (!isRegister) {
            return
        }
    }, [dispatch, isRegister])

    if (isRegister) {
        navigate(PATH.LOGIN_PAGE)
    }

    return (
        <PaperContainer title={'Registration'}>
            <div className={styles.form}>
                <TextField value={email}
                           type={'email'}
                           placeholder={'Email*'}
                           onChange={handleEmail}
                           variant="standard"
                />
                <ReusablePasswordInput value={password}
                                       placeholder={'Password*'}
                                       onChangeHandler={handlePassword}
                />
                <ReusablePasswordInput value={confirmPassword}
                                       placeholder={'Confirm password*'}
                                       onChangeHandler={handleConfirmPassword}
                /></div>
            <Button variant={"contained"} onClick={handleSubmit} disabled={isLoading === 'loading'}> Register </Button>

            <NavLink to={PATH.LOGIN_PAGE} className={style.navLinkStyle}>Already registered?</NavLink>
            {!submitted ? <div className={styles.error}>{error}</div> : <ErrorSnackbar/>}
        </PaperContainer>
    );
};