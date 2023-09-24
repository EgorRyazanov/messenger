import "./avatar.scss";

export const avatarTemplate = `
  {{#if avatar}}
    <div class="avatar {{inputContainerClasses}} {{#if isActive }} avatar-active {{/if}}">
      <img class="avatar-image" src='{{avatar}}' alt="Аватар">
      <input id="{{id}}" type='file' accept="image/png, image/jpeg" class="avatar-input" />
    </div>
  {{else}} 
    <div class="avatar {{inputContainerClasses}} {{#if isActive }} avatar-active {{/if}}">
      <input id="{{id}}" type='file' accept="image/png, image/jpeg" class="avatar-input" />
    </div>
  {{/if}}
`;
