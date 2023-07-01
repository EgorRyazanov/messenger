import "./profile.scss";

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
                {{#if params.isProfile}}
                    <h4 class="profile__name">{{profile.displayName}}</h4>
                {{/if}}
                {{{form}}}
                {{#if params.isProfile}}
                    <div class="profile__link">
                        {{{linkEdit}}}
                    </div>
                    <div class="profile__link">
                        {{{linkPassword}}}
                    </div>
                    <div class="profile__link">
                        {{{linkExit}}}
                    </div>
                {{/if}}
            </div>
        </div>
    </div>
`;
