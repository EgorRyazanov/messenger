import { LoginPage } from "./pages/login-page/index.ts";
import { RegistrationPage } from "./pages/register-page/index.ts";
import { MainPage } from "./pages/main-page/index.ts";
import { DATA_CHATS, DATA_PROFILE } from "./utils/constants.ts";
import { ProfilePage } from "./pages/profile-page/index.ts";
import { ErrorPage } from "./pages/error-page/index.ts";
import "./styles/index.scss";
import { router } from "./utils/router.ts";
import { Block } from "./utils/block.ts";

// const getPage = () => {
//     switch (window.location.pathname) {
//         case "/login": {
//             return new LoginPage();
//         }
//         case "/registration": {
//             return new RegistrationPage();
//         }
//         case "/profile/edit": {
//             return new ProfilePage({ profile: DATA_PROFILE, url: "/profile" });
//         }
//         case "/profile/change-password": {
//             return new ProfilePage({ profile: DATA_PROFILE, url: "/profile" });
//         }
//         case "/profile": {
//             return new ProfilePage({ profile: DATA_PROFILE, url: "/" });
//         }
//         case "/": {
//             return new MainPage({ chats: DATA_CHATS, activeChat: null });
//         }
//         default: {
//             const pathname = window.location.pathname.slice(1);
//             const activeChat = DATA_CHATS.find((person) => person.id === pathname);
//             if (activeChat) {
//                 return new MainPage({ activeChat, chats: DATA_CHATS });
//             }
//             return new ErrorPage({ title: "404" });
//         }
//     }
// };

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("app");
    if (root) {
        router
            .use("/login", LoginPage)
            .use("/registration", RegistrationPage)
            .use("/profile/edit", ProfilePage as typeof Block, { profile: DATA_PROFILE, url: "/profile" })
            .use("/profile/change-password", ProfilePage as typeof Block, { profile: DATA_PROFILE, url: "/profile" })
            .use("/profile", ProfilePage as typeof Block, { profile: DATA_PROFILE, url: "/" })
            .use("/", MainPage as typeof Block, { chats: DATA_CHATS, activeChat: null })
            .start();

        // Сделать редирект на error page.
        // Добавить роут с нормальный Profile page
        // Сдлеать нормальные чаты
    }
});
