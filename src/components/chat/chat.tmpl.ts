import "./chat.scss";

export const chatTemplate = `
    {{#if activeChat}}
        <div class="chat__container">
            <div class="chat__header">
                <div class="header__user">
                    {{{avatar}}}
                    <p class="header__name">{{activeChat.title}}</p>
                </div>
                <div class="header__actions">
                    {{{AddPersonButton}}}
                    {{{DeletePersonButton}}}
                    {{{ChatDeleteButton}}}
                </div>
            </div>
            {{{messagesContainer}}}
            <div class="chat__footer">
                {{{form}}}
            </div>
        <div>
    {{else}}
        <div class="chat__container">
            <div class="chat--empty">
                <h3 class="chat__error">Выберите чат, чтобы отправить сообщение</h3>
            </div>
        </div>
    {{/if}}

`;
