export const formTemplate = `<form class="form auth__form {{classNames}}">
            {{#if title}} <h2 class="form__title">{{title}}</h2> {{/if}}
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            {{{button}}}
            {{{link}}}
        </form>`;
