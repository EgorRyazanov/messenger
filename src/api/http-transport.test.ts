import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from "sinon";
import { expect } from "chai";

import { HTTPTransport } from "./http-transport.ts";

describe("HTTPTransport", () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    let requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        global.XMLHttpRequest = xhr;

        xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        };

        instance = new HTTPTransport("/auth");
    });

    afterEach(() => {
        requests = [];
    });

    describe(".get()", () => {
        it("should send GET request", () => {
            instance.get("/user");

            const [request] = requests;

            expect(request.method).to.eq("get");
        });

        it("should convert object body to query", () => {
            instance.get("/", {
                data: {
                    test: 1,
                    anotherTest: 2,
                },
            });

            const [request] = requests;

            expect(request.url).includes("?test=1&anotherTest=2");
        });

        it("should convert body with array to query", () => {
            instance.get("/", {
                data: {
                    test: [1, 2],
                },
            });

            const [request] = requests;

            expect(request.url).includes("?test[0]=1&test[1]=2");
        });
    });

    describe(".post()", () => {
        it(".post() should send POST request", () => {
            instance.post("/user", {
                data: {
                    test: 1,
                },
            });

            const [request] = requests;

            expect(request.method).to.eq("post");
        });

        it("should set headers to request", () => {
            instance.post("/user", {
                data: {
                    test: 1,
                },
                headers: {
                    test: "test",
                },
            });

            const [request] = requests;

            expect(request.requestHeaders).to.have.key("test");
        });
    });

    it(".put() should send PUT request", () => {
        instance.put("/user", {
            data: {
                test: 1,
            },
        });

        const [request] = requests;

        expect(request.method).to.eq("put");
    });

    it(".patch() should send PATCH request", () => {
        instance.patch("/user", {
            data: {
                test: 1,
            },
        });

        const [request] = requests;

        expect(request.method).to.eq("patch");
    });

    it(".delete() should send DELETE request", () => {
        instance.delete("/user");

        const [request] = requests;

        expect(request.method).to.eq("delete");
    });
});
