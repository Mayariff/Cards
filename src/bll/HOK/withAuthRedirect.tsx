import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {PATH} from "../../ui/Routes/Routes";
import {restoreState} from "../../dal/localStorage/localStorage";

//оборачиваем страницы , в которых нужна логинизация нпр:export default compose(withAuthRedirect)(Profile);

/*export type mapStateToPropsForRedirectType={
    isAuth: boolean
}
let mapStateToPropsForRedirect = (state:AppRootStateType ): mapStateToPropsForRedirectType => {
    return {isAuth: state.App.isInitialized}
}*/
export function withAuthRedirect<T>(Component: React.ComponentType<T>) {

    const RedirectComponent =({...restProps})=>{
        const location= useLocation()
        //const navigate = useNavigate()
        const isLoggedIn = restoreState('isLogged', false)
        //const isLoggedIn= useAppSelector<boolean>(state=> state.Login.isLogged)

        if (!isLoggedIn) return <Navigate to= {PATH.LOGIN_PAGE} state={{from:location}} />
        return <Component {...restProps as T}/>
    }

    //return connect(mapStateToPropsForRedirect )(RedirectComponent);
    return RedirectComponent
}