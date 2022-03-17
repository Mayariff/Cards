import {Route, Routes} from "react-router-dom";
import {Login} from "../0 AuthFlow/0.2 LoginPage/Login";
import {Register} from "../0 AuthFlow/0.1 RegistrationPage/Register";
import {ForgotPassword} from "../0 AuthFlow/0.3 RecoweringPassword/0.3.1 ForgotPassPage/ForgotPassword";
import React from "react";
import CheckEmail from "../0 AuthFlow/0.3 RecoweringPassword/0.3.2 ChackEmail/ChackEmail";
import PasswordEnter from "../0 AuthFlow/0.3 RecoweringPassword/0.3.3 CreateNewPassword/PasswordEnter";
import PacksTable from "../2 PackListPage/PacksTablePage";
import {AuthProvider} from "../../bll/HOK/AuthProvider";
import CardsTable from "../4 CardListPage/CardsTablePage";
import LearningCard from "../6 CardsForLearning/LearningCard";
import ProfilePage from "../1 ProfilePage/ProfilePage";

export const PATH = {
    START_PAGE: '/',
    LOGIN_PAGE: '/login',
    PROFILE_PAGE: '/profile',
    REGISTRATION_PAGE: '/register',
    FORGOT_PAGE: '/passwordRecovery',
    CHECK_EMAIL_PAGE: '/check_email',
    CREATE_NEW_PASSWORD_PAGE: '/set-new-password/:token',
    PACKS_TABLE_PAGE: '/packs',
    CARDS_TABLE_PAGE:'/cards/:id',
    CARD_PAGE:'/cards/card/:id',
}


function Routing() {
    return (
        <AuthProvider>
            <Routes>
                <Route path={PATH.START_PAGE} element={<ProfilePage />}/>
                <Route path={PATH.LOGIN_PAGE} element={<Login/>}/>
                <Route path={PATH.REGISTRATION_PAGE} element={<Register/>}/>
                <Route path={PATH.FORGOT_PAGE} element={<ForgotPassword/>}/>
                <Route path={PATH.CHECK_EMAIL_PAGE} element={<CheckEmail/>}/>
                <Route path={PATH.PROFILE_PAGE} element={<ProfilePage />}/>
                <Route path={PATH.CREATE_NEW_PASSWORD_PAGE} element={<PasswordEnter/>}/>
                <Route path={PATH.PACKS_TABLE_PAGE} element={<PacksTable/>}/>
                <Route path={PATH.CARDS_TABLE_PAGE} element={<CardsTable/>}/>
                <Route path={PATH.CARD_PAGE} element={<LearningCard />}/>
            </Routes>
        </AuthProvider>
    )
}

export default Routing