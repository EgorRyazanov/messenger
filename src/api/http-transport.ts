import { queryString } from "../utils/helpers.ts";
import { ApiMethods, Config } from "./types.ts";

type HTTPMethod = <R = unknown>(url: string, options?: Config) => Promise<R>;

export class HTTPTransport {
    public static BASE_URL = "https://ya-praktikum.tech/api/v2";

    // eslint-disable-next-line no-useless-constructor
    public constructor(private readonly endpointSuffix: string) {}

    public get: HTTPMethod = (url, options) => {
        return this.request(
            options?.data != null ? `${url}?${queryString(options.data)}` : url,
            { ...options, method: ApiMethods.Get },
            options?.timeout,
        );
    };

    public delete: HTTPMethod = (url, options?) => {
        return this.request(url, { ...options, method: ApiMethods.Delete }, options?.timeout);
    };

    public put: HTTPMethod = (url, options?) => {
        return this.request(url, { ...options, method: ApiMethods.Put }, options?.timeout);
    };

    public post: HTTPMethod = (url, options?) => {
        return this.request(url, { ...options, method: ApiMethods.Post }, options?.timeout);
    };

    public patch: HTTPMethod = (url, options?) => {
        return this.request(url, { ...options, method: ApiMethods.Patch }, options?.timeout);
    };

    private request<T>(url: string, options: Config, timeout = 5000): Promise<T> {
        const { method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method ?? ApiMethods.Get, `${HTTPTransport.BASE_URL}${this.endpointSuffix}${url}`);

            if (options.headers != null) {
                for (const [key, value] of Object.entries(options.headers)) {
                    xhr.setRequestHeader(key, value);
                }
            }

            xhr.withCredentials = true;
            xhr.timeout = timeout;
            xhr.responseType = "json";

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = () => reject();
            xhr.onerror = () => reject();
            xhr.ontimeout = () => reject();

            if (method === ApiMethods.Get || data == null) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else if (data instanceof File) {
                const formData = new FormData();
                formData.append("avatar", data);
                xhr.send(formData);
            } else {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
