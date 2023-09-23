import Handlebars from "handlebars";

import { converChatsListsDate } from "../../utils/utils.ts";
import "./chat-list-item.scss";

Handlebars.registerHelper("lastItemDate", (date: Date) => {
    return converChatsListsDate(date);
});

export const chatsListItemTemplate = `
  <li class="chat__item {{chatSelectedClassname}}"> 
      {{{avatar}}}
      <div class="chat__text-container">
          <h5 class="chat__title">{{chat.title}}</h5>
          {{#if chat.lastMessage}}
              <p class="chat__text">{{this.content}}</p>
          {{/if}}
      </div>
      {{#if chat.lastMessage}}
        <div class="chat__additional">
            <div class="additional__date">
                {{lastItemDate this.date}}
            </div>
        </div>
      {{/if}}
  </li>
`;
