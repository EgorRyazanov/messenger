import Handlebars from "handlebars";

import { userErrorTemplate } from "./error-page";
import { Link } from "../../components/link";

export const Error = (title) => Handlebars.compile(userErrorTemplate)({ linkBack: Link({ text: "Назад к чатам", url: "/" }), title });
