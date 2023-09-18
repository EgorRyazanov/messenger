export enum API_METHODS {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT",
}

export type TConfig = {
    data?: any;
    timeout?: number;
    method: API_METHODS;
    headers: {
        [key in string]: string;
    };
};
