import Handlebars from "handlebars";

import { store } from "../../utils/store.ts";
import { converChatDate } from "../../utils/utils.ts";
import "./messages-container.scss";

Handlebars.registerHelper("messageDate", (message, opts) => {
    const userId = store.selectUserId();
    if (message.userId === userId) {
        return opts.fn(converChatDate(message.time));
    }
    return opts.inverse(converChatDate(message.time));
});

Handlebars.registerHelper("ifMessageAuthorContainer", (messageUserId, opts) => {
    const userId = store.selectUserId();
    if (userId === messageUserId) {
        return opts.fn("class='messages-container__message messages-container__message--you'");
    }
    return opts.inverse("class='messages-container__message'");
});

export const messagesContainerTemplate = `
  <div id="{{id}}" class="messages-container">
      {{#each messages}}
          <div {{#ifMessageAuthorContainer this.userId}} {{{this}}} {{else}} {{{this}}} {{/ifMessageAuthorContainer}}>
              <p>{{this.content}}</p>
              {{#messageDate this}}
                <p class="message-date message-date--you">{{this}}<p>
              {{else}}
                <p class="message-date">{{this}}</p>
              {{/messageDate}}
          </div>
      {{/each}}
  </div>`;
