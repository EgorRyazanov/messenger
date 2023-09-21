import "../profile.scss";

export const profileTemplate = `
    <div class="container flex">
        <nav class="profile__navbar">
            {{{backButton}}}
        </nav>
        <div class="profile__container">
            <div class="profile__data">
                {{#if profile.avatar}}
                    <img class="profile__avatar" src='{{profile.avatar}}' alt="Аватар">
                {{else}} 
                    <div class="profile__avatar"></div>
                {{/if}}
                {{{form}}}
            </div>
        </div>
    </div>
`;
