import { LoginPage } from "./pages/login-page/index.ts";
import { RegistrationPage } from "./pages/register-page/index.ts";
import { MainPage } from "./pages/main-page/index.ts";
import { DATA_CHATS, DATA_PROFILE } from "./utils/constants.ts";
import { ProfilePage } from "./pages/profile-pages/profile-page/index.ts";
import { ErrorPage } from "./pages/error-page/index.ts";
import { router } from "./utils/router.ts";
import { ProfileChangePasswordPage } from "./pages/profile-pages/profile-change-password-page/index.ts";
import { ProfileEditPage } from "./pages/profile-pages/profile-edit-page/index.ts";
import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("app");
    if (root) {
        router
            .use("/", MainPage, { chats: DATA_CHATS, activeChat: null })
            .use("/login", LoginPage)
            .use("/registration", RegistrationPage)
            .use("error", ErrorPage)
            .use("/profile/edit", ProfileChangePasswordPage, { profile: DATA_PROFILE })
            .use("/profile/change-password", ProfileEditPage, { profile: DATA_PROFILE })
            .use("/profile", ProfilePage, { profile: DATA_PROFILE, url: "/" })
            .start();

        // Добавить роут с нормальный Profile page
        // Сдлеать нормальные чаты
    }
});
