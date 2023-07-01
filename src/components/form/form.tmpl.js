export const formTemplate = `<form class="form auth__form {{classNames}}">
            <h2 class="auth__title">{{title}}</h2>
            {{#each inputs}}
                {{{this}}}
            {{/each}}
            {{{button}}}
            {{{link}}}
        </form>`;
