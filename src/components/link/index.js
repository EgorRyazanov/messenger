import Handlebars from "handlebars";
import "./link.scss";

export const Link = ({ text, url = "/", linkClasses = "" }) =>
    Handlebars.compile(`<a class="link {{linkClasses}}" href={{url}}>{{text}}</a>`)({ text, url, linkClasses });
