import "../profile.scss";

export const profileTemplate = `
    <div class="container flex">
        <nav class="profile__navbar">
            {{{backButton}}}
        </nav>
        <div class="profile__container">
            <div class="profile__data">
                {{{avatar}}}
                <h4 class="profile__name">{{displayName}}</h4>
                {{{form}}}
                <div class="profile__link">
                    {{{linkEdit}}}
                </div>
                <div class="profile__link">
                    {{{linkPassword}}}
                </div>
                <div class="profile__link">
                    {{{linkExit}}}
                </div>
            </div>
        </div>
    </div>
`;
