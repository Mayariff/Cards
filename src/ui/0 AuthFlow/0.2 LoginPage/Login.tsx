import React, {ChangeEventHandler, useCallback, useEffect, useState} from 'react';
import style from './Login.module.css'
import {useDispatch} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType, setAppErrorAC} from "../../../bll/reducers/appReducer";
import {loginTC} from "../../../bll/reducers/loginReducer";
import PaperContainer from "../../8 Helpers & Visual Components/8.3 Visual/8.3.1 PaperContainer/PaperContainer";
import {PATH} from "../../Routes/Routes";
import ReusableCheckbox from "../../8 Helpers & Visual Components/8.3 Visual/8.3.2 ReusableCheckBox/ReusableCheckbox";
import {ErrorSnackbar} from "../../7 CommonComponents/7.4 ErrorSnackbar/ErrorSnackbar";
import {restoreState, saveState} from "../../../dal/localStorage/localStorage";
import ReusablePasswordInput from '../../8 Helpers & Visual Components/8.3 Visual/8.3.3 ReusablePasswordInput/ReusablePasswordInput';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";


export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    // @ts-ignore
    const fromPage = location.state?.from?.pathname || PATH.PROFILE_PAGE

    const isLoggedIn = restoreState('isLogged', false)
    const error = useAppSelector<string | null>(state => state.App.error)
    const status = useAppSelector<RequestStatusType>(state => state.App.status)


    const [email, setEmail] = useState<string>('79027972026@yandex.ru')
    const [password, setPassword] = useState<string>('123456789')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const handleEmail: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setEmail(e.currentTarget.value)
    }, [setEmail])
    const handlePassword: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setPassword(e.currentTarget.value)
    }, [setPassword])
    const handleRememberMe: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setRememberMe(e.target.checked)
    }, [setRememberMe])
    const singInHandler = useCallback(() => {
        dispatch(loginTC({email, password, rememberMe}))
        saveState('isLogged', true)
    }, [loginTC, dispatch, email, password, rememberMe])


    useEffect(() => {
        dispatch(setAppErrorAC(null))
        if (isLoggedIn) {
            fromPage === null || '/' ? navigate(PATH.PROFILE_PAGE) : navigate(-1)
        } else {
            return
        }
    }, [isLoggedIn])

    if (error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
        dispatch(setAppErrorAC(null))
    }


    return (
        <PaperContainer title={'Login'}>
            <div className={style.form}>
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
                <ReusableCheckbox title={'remember me'} checked={rememberMe}
                                  onChange={handleRememberMe}
                />
            </div>
            <NavLink className={style.navLinkStyle} to={PATH.FORGOT_PAGE}>
                <span>forgot password?</span></NavLink>
            <Button onClick={singInHandler} disabled={status === 'loading'} variant={"contained"}>Login</Button>
            <p>Don't have an account?</p>
            <NavLink className={`${style.navLinkStyle} ${style.SignUp}`} to={PATH.REGISTRATION_PAGE}>Sing Up</NavLink>
            {error && <ErrorSnackbar/>}
        </PaperContainer>)
}