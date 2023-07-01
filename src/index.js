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
            case "/profile/edit": {
                return new Profile({ profile: data_profile, url: "/profile" });
            }
            case "/profile/change-password": {
                return new Profile({ profile: data_profile, url: "/profile" });
            }
            case "/profile": {
                return new Profile({ profile: data_profile, url: "/" });
            }
            case "/": {
                return new Main({ chats: data_chats, activeChat: "" });
            }
            default: {
                const pathname = window.location.pathname.slice(1);
                const activeChat = data_chats.find((person) => person.id === pathname);
                if (activeChat) {
                    return new Main({ activeChat, chats: data_chats });
                }
                return new Error({ title: "404" });
            }
        }
    };

    const page = getPage();
    root.innerHTML = "";
    root.append(page.getContent());
    page.dispatchComponentDidMount();
});
