import "./styles/index.scss";
import { Login } from "./pages/login-page";
import { Register } from "./pages/register-page";
import { Main } from "./pages/main-page";
import { data_chats, data_profile } from "./utils/constants";
import { Profile } from "./pages/profile";
import { Error } from "./pages/error-page";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("app");
    const loginPage = new Login();
    root.append(loginPage.getContent());
    loginPage.dispatchComponentDidMount();
    const getPage = () => {
        switch (window.location.pathname) {
            case "/login": {
                return new Login();
            }
            case "/register": {
                return new Register();
            }
            default: {
                return new Login();
            }
        }
    };

    const page = getPage().getContent();
    root.innerHTML = "";
    root.append(page);
    page.dispatchComponentDidMount();
    // const getPage = () => {
    //     switch (window.location.pathname) {
    //         case "/login": {
    //             return Login();
    //         }
    //         case "/register": {
    //             return Register();
    //         }
    //         case "/": {
    //             return Main(data_chats, "");
    //         }
    //         case "/profile/edit": {
    //             return Profile(data_profile, "/profile");
    //         }
    //         case "/profile/change-password": {
    //             return Profile(data_profile, "/profile");
    //         }
    //         case "/profile": {
    //             return Profile(data_profile, "/");
    //         }
    //         case "/server-error": {
    //             return Error("500");
    //         }
    //         default: {
    //             const pathname = window.location.pathname.slice(1);
    //             const activeChat = data_chats.find((person) => person.id === pathname);
    //             if (activeChat) {
    //                 return Main(data_chats, activeChat);
    //             }
    //             return Error("404");
    //         }
    //     }
    // };

    // root.innerHTML = getPage();
});
