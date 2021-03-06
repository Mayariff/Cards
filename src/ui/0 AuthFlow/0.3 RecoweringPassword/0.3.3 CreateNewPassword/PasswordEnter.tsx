import React, {ChangeEventHandler, useCallback, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../bll/store";
import {RequestStatusType, setAppErrorAC} from "../../../../bll/reducers/appReducer";
import {setNewPasswordTC} from "../../../../bll/reducers/loginReducer";
import {PATH} from "../../../Routes/Routes";
import PaperContainer from "../../../8 Helpers & Visual Components/8.3 Visual/8.3.1 PaperContainer/PaperContainer";
import {ErrorSnackbar} from "../../../7 CommonComponents/7.4 ErrorSnackbar/ErrorSnackbar";
import style from './PasswordEnter.module.css'
import ReusablePasswordInput from "../../../8 Helpers & Visual Components/8.3 Visual/8.3.3 ReusablePasswordInput/ReusablePasswordInput";
import Button from "@mui/material/Button";

const PasswordEnter = () => {
    const {token} = useParams<'token'>()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isRequestSucceeded = useAppSelector<boolean>(state => state.Login.isRequestSucceeded)
    const error = useAppSelector<string | null>(state => state.App.error)
    const status = useAppSelector<RequestStatusType>(stare => stare.App.status)

    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const handlePassword: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setPassword(e.currentTarget.value)
        dispatch(setAppErrorAC(null))
    }, [dispatch, setPassword])
    const handlePassword2: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setPassword2(e.currentTarget.value)
        dispatch(setAppErrorAC(null))
    }, [dispatch, setPassword2])
    const handleSubmit = useCallback(() => {
        if (password === password2) {
            token ?
                dispatch(setNewPasswordTC({password, resetPasswordToken: token}))
                : dispatch(setAppErrorAC('missing token'))
        } else {
            dispatch(setAppErrorAC('Passwords is different'))
        }
    }, [dispatch, setNewPasswordTC, password, password2, token])

    if (isRequestSucceeded) {
        navigate(PATH.LOGIN_PAGE)
    }
    return (
        <PaperContainer title={'Create new password'}>
            <div className={style.container}>
                <div className={style.form}>
                    <ReusablePasswordInput value={password}
                                           placeholder={'Password*'}
                                           onChangeHandler={handlePassword}
                    />
                    <ReusablePasswordInput value={password2}
                                           placeholder={'Confirm Password*'}
                                           onChangeHandler={handlePassword2}
                    /></div>

                <div>
                    <Button variant={"contained"} onClick={handleSubmit}
                            disabled={status === 'loading' || !!error}>Update</Button></div>
            </div>
            {error && <ErrorSnackbar/>}
        </PaperContainer>
    );
};

export default PasswordEnter;