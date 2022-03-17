import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {emailValidator} from '../../../../utilities/validatorApp';
import {useAppSelector} from "../../../../bll/store";
import PaperContainer from "../../../8 Helpers & Visual Components/8.3 Visual/8.3.1 PaperContainer/PaperContainer";
import {setAppErrorAC} from "../../../../bll/reducers/appReducer";
import {setEmailForPasswordTC} from "../../../../bll/reducers/loginReducer";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../Routes/Routes";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import style from './ForgotPassword.module.css'


export const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isRequestSucceeded = useAppSelector<boolean>(store => store.Login.isRequestSucceeded)

    const [email, setEmail] = useState<string>('')

    const handleSubmit = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    },[setEmail])
    const sendEmailVerificationHandler = useCallback(() => {
        if (emailValidator(email)) {
            dispatch(setAppErrorAC('Wrong login type'))
        } else {
            dispatch(setEmailForPasswordTC(email))}
    },[emailValidator, email, dispatch,setEmailForPasswordTC])

    if (isRequestSucceeded) {
        navigate(PATH.CHECK_EMAIL_PAGE)
    }

    return (
        <PaperContainer title={'Forgot your password?'}>
            <div className={style.content}>
                <TextField value={email}
                          type={'email'}
                          label={'Email'}
                          placeholder={'Enter email'}
                          onChange={handleSubmit}
                          variant="standard"
            />
                <p className={style.text}>Enter your email address and we will send you further instructions </p>
                <Button onClick={sendEmailVerificationHandler}
                        variant={"contained"}>Submit</Button>
            </div>
        </PaperContainer>
    );
};

