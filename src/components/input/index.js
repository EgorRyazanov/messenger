import Handlebars from "handlebars";
import "./input.scss";

export const Input = ({ name, labelValue, inputClasses = "", isDisabled = false, value = "", type = "text" }) =>
    Handlebars.compile(`
    <div class="input__container">
        <label class="input__label" for={{name}}>{{labelValue}}</label>
        <input type='{{type}}' value='{{value}}' {{#if isDisabled }} disabled {{/if}} id={{name}} type="text" name={{name}} class="input {{inputClasses}}" >
    </div>
`)({ name, labelValue, inputClasses, isDisabled, value, type });
