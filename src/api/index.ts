import { queryString } from "../utils/helpers.ts";
import { API_METHODS, TConfig } from "./types.ts";

type HTTPMethod = (url: string, options: TConfig) => Promise<unknown>;

export class HTTPTransport {
    constructor() {
        this.request = this.request.bind(this);
    }

    get: HTTPMethod = (url, options) => {
        return this.request(
            options.data ? `${url}${queryString(options.data)}` : url,
            { ...options, method: API_METHODS.GET },
            options.timeout,
        );
    };

    delete: HTTPMethod = (url, options) => this.request(url, { ...options, method: API_METHODS.DELETE }, options.timeout);

    put: HTTPMethod = (url, options) => this.request(url, { ...options, method: API_METHODS.PUT }, options.timeout);

    post: HTTPMethod = (url, options) => this.request(url, { ...options, method: API_METHODS.POST }, options.timeout);

    request = (url: string, options: TConfig, timeout = 5000) => {
        const { method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            if (options.headers) {
                for (const [key, value] of Object.entries(options.headers)) {
                    xhr.setRequestHeader(key, value);
                }
            }

            xhr.onload = () => resolve(xhr);
            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === API_METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
