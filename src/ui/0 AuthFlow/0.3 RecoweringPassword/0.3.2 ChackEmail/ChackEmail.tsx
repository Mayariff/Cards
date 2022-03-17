import React from 'react';
import {useAppSelector} from "../../../../bll/store";
import PaperContainer from "../../../8 Helpers & Visual Components/8.3 Visual/8.3.1 PaperContainer/PaperContainer";
import emailIMG from '../../../../assets/image/email.png'
import style from './ChackEmail.module.css'


const CheckEmail = () => {
    const email = useAppSelector<string>(store => store.Login.email)
    return (
        <PaperContainer title={'Check Email'}>
            <div className={style.content}>
                <img src={emailIMG} alt={'Success'} className={style.img}/>
                <span className={style.text}>We've sent an Email with instructions to {email}</span>
            </div>
        </PaperContainer>
    );
};

export default CheckEmail;

