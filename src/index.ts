import { LoginPage } from "./pages/login-page/index.ts";
import { RegistrationPage } from "./pages/registration-page/index.ts";
import { MainPage } from "./pages/main-page/index.ts";
import { DATA_CHATS } from "./utils/constants.ts";
import { ProfilePage } from "./pages/profile-pages/profile-page/index.ts";
import { ErrorPage } from "./pages/error-page/index.ts";
import { router } from "./utils/router.ts";
import { ProfileChangePasswordPage } from "./pages/profile-pages/profile-change-password-page/index.ts";
import { ProfileEditPage } from "./pages/profile-pages/profile-edit-page/index.ts";
import AuthController from "./controllers/auth-controller.ts";
import "./styles/index.scss";

export enum Routes {
    Main = "/",
    Register = "/register",
    Login = "/login",
    Profile = "/profile",
    ProfileEdit = "/profile/edit",
    ProfileChangePassword = "/profile/change-password",
    Error = "/error",
}

document.addEventListener("DOMContentLoaded", async () => {
    const root = document.getElementById("app");
    if (root) {
        let isProtectedRoute = true;

        router
            .use(Routes.Main, MainPage, { chats: DATA_CHATS, activeChat: null })
            .use(Routes.Login, LoginPage)
            .use(Routes.Register, RegistrationPage)
            .use(Routes.Error, ErrorPage)
            .use(Routes.ProfileChangePassword, ProfileChangePasswordPage)
            .use(Routes.ProfileEdit, ProfileEditPage)
            .use(Routes.Profile, ProfilePage);

        switch (window.location.pathname) {
            case Routes.Login:
            case Routes.Register:
                isProtectedRoute = false;
                break;
            default:
                break;
        }

        try {
            await AuthController.fetchUser();
            router.start();
            if (!isProtectedRoute) {
                router.go(Routes.Profile);
            }
        } catch (e: unknown) {
            router.start();
            if (isProtectedRoute) {
                router.go(Routes.Login);
            }
        }
    }
});
