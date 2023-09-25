export enum ApiMethods {
    Get = "get",
    Post = "post",
    Delete = "delete",
    Put = "put",
    Patch = "patch",
}

export type Config = {
    data?: unknown;
    timeout?: number;
    method?: ApiMethods;
    headers?: {
        [key in string]: string;
    };
};
