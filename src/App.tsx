import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import Routing, { PATH } from "./ui/Routes/Routes";
import style from './App.module.css'
import {isAuthTC} from "./bll/reducers/appReducer";
import {clearState} from "./dal/localStorage/localStorage";
import {Header} from "./ui/7 CommonComponents/7.1 Header/Header";
import Loading from "./ui/7 CommonComponents/7.5 Loading/Loading";
import {useAppSelector} from "./bll/store";
import {useNavigate} from "react-router-dom";



function App() {

    const dispatch = useDispatch();
    const isInitialized = useAppSelector<boolean>(state => state.App.isInitialized)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(isAuthTC())
        if (!navigator.cookieEnabled) {
            clearState('isLogged', false)
            navigate(PATH.LOGIN_PAGE)
        }
    }, [])


   if (!isInitialized) return <Loading />

    return (
        <div className={style.App}>
            <Header/>
            <div className={style.container}>
                <Routing/>
                <Loading  />
            </div>
        </div>
    );
}

export default App;
