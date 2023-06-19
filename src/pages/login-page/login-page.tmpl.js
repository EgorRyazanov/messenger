import "../../styles/auth-forms.scss";
import "./login-page.scss";

export const loginPageTemplate = `
    <div class="container auth__container login__container">
        <form class="form auth__form login__form">
            <h2 class="auth__title">Вход</h2>
            {{{inputLogin}}}
            {{{inputPassword}}}
            {{{button}}}
            {{{link}}}
        </form>
    </div>
`;
