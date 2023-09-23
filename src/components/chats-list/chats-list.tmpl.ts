import arrow from "../../assets/icons/arrow.svg";
import "./chats-list.scss";

export const chatsListTemplate = `
    <div class="chats-list__container">
        <a href="/profile" class="chats-list__profile-link">
            Профиль
            <img class="profile-link__image" src=${arrow} alt="Картинка">
        </a>
        {{{SearchComponent}}}
        <ul class="chats-list__persons-container">
            {{#each chatItems}}
                {{{this}}}
            {{/each}}
        </ul>
    </div>
`;
