import "./register-page.scss";

export const registerPageTemplate = `
    <div class="container auth__container register__container">
        <form class="form auth__form register__form">
            <h2 class="auth__title">Регистрация</h2>
            {{{inputEmail}}}
            {{{inputLogin}}}
            {{{inputName}}}
            {{{inputSecondName}}}
            {{{inputPhone}}}
            {{{inputPassword}}}
            {{{inputRepeatPassword}}}
            {{{button}}}
            {{{link}}}
        </form>
    </div>
`;
