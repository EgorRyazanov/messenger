export const formTemplate = `<form class="form {{classNames}}">
            {{#if title}} <h2 class="form__title">{{title}}</h2> {{/if}}
            <p class="form__error">{{error}}</p>
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            {{{button}}}
            {{{link}}}
        </form>`;
