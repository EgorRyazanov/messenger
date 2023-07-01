const METHODS = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
};

function queryStringify(data) {
    if (data && Object.keys(data).length > 0) {
        let foramtedData = `?`;
        for (let key in data) {
            foramtedData += `${key}=${data[key]}&`;
        }
        return foramtedData.slice(0, foramtedData.length - 1);
    }
    return "";
}

class HTTPTransport {
    get = (url, options = {}) => {
        console.log(`${url}${queryStringify(options.data)}`);
        return this.request(options.data ? `${url}${queryStringify(options.data)}` : url, { ...options, method: METHODS.GET }, options.timeout);
    };

    delete = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    put = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    post = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

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

            xhr.onload = function () {
                resolve(xhr);
            };
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
