import {Switch, Route, Redirect} from "react-router";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import {ChatsPage} from "../pages/ChatsPage";

export const useRoutes = (isAuthenticated: boolean) => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage/>
                </Route>
                <Route path="/chats" exact>
                    <ChatsPage/>
                </Route>
                <Redirect to=""/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}