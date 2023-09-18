import "./error-page.scss";

export const userErrorTemplate = `
    <div class="container error__container">
        <div class="error__text-container">
            <h2 class="error__title">{{title}}</h2>
            <p class="error__description">Мы уже фиксим</p>
            {{{linkBack}}}
        </div>
    </div>
`;
