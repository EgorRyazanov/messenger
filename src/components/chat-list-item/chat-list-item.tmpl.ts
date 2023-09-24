import Handlebars from "handlebars";

import { converChatsListsDate } from "../../utils/utils.ts";
import "./chat-list-item.scss";

Handlebars.registerHelper("lastItemDate", (date: Date | null) => {
    if (date != null) {
        return converChatsListsDate(date);
    }
    return null;
});

export const chatsListItemTemplate = `
  <li class="chat__item {{chatSelectedClassname}}"> 
      {{{avatar}}}
      <div class="chat__text-container">
          <h5 class="chat__title">{{chat.title}}</h5>
          {{#if chat.lastMessage}}
              <p class="chat__text">{{chat.lastMessage.content}}</p>
          {{/if}}
      </div>
      {{#if chat.lastMessage}}
        <div class="chat__additional">
            <div class="additional__date">
                {{lastItemDate chat.lastMessage.date}}
            </div>
        </div>
      {{/if}}
  </li>
`;
