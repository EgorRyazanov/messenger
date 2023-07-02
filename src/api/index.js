const METHODS = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
};

function queryStringify(data) {
    if (data && Object.keys(data).length > 0) {
        let foramtedData = "?";
        Object.keys(data).forEach((key) => {
            foramtedData += `${key}=${data[key]}&`;
        });
        return foramtedData.slice(0, foramtedData.length - 1);
    }
    return "";
}

export class HTTPTransport {
    constructor() {
        this.request = this.request.bind(this);
    }

    get = (url, options = {}) => {
        return this.request(
            options.data ? `${url}${queryStringify(options.data)}` : url,
            { ...options, method: METHODS.GET },
            options.timeout,
        );
    };

    delete = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

    put = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

    post = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

    // eslint-disable-next-line
    request = (url, options, timeout = 5000) => {
        const { method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            if (options.headers) {
                for (const [key, value] of Object.entries(options.headers)) {
                    xhr.setRequestHeader(key, value);
                }
            }

            xhr.onload = resolve(xhr);
            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
