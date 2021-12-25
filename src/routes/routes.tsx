import {Switch, Route, Redirect} from "react-router";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import {ChatsPage} from "../pages/ChatsPage";
import {CreateCarPage} from "../pages/CreateCarPage";
import {CarPage} from "../pages/CarPage";

export const useRoutes = (isAuthenticated: boolean, car: boolean, carLoading: boolean) => {
    if (isAuthenticated) {
        if (car) {
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
                    <Route path="/chats" exact>
                        <ChatsPage/>
                    </Route>
                    <Route path="/car" exact>
                        <CarPage/>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Route path="/create-car" exact>
                        <CreateCarPage/>
                    </Route>
                    <Redirect to="/create-car"/>
                </Switch>
            )
        }
    }
    return (
        <Switch>
            <Route path="/login" exact>
                <LoginPage/>
            </Route>
            <Route path="/register" exact>
                <RegisterPage/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}