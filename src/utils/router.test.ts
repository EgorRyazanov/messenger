// needs to disable eslint property to replace class
// eslint-disable-next-line max-classes-per-file
import { describe, it } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import { Block } from "./block.ts";
import { router } from "./router.ts";

describe("Router", () => {
    global.window.history.back = () => {
        if (typeof window.onpopstate === "function") {
            window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
        }
    };
    global.window.history.forward = () => {
        if (typeof window.onpopstate === "function") {
            window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
        }
    };

    const getContentFake = sinon.fake.returns(document.createElement("div"));
    const dispatchComponentDidMountFake = sinon.fake.returns(undefined);
    const removeEventsFake = sinon.fake.returns(undefined);

    class FakeBlock {
        protected getContent = getContentFake;

        protected dispatchComponentDidMount = dispatchComponentDidMountFake;

        protected removeEvents = removeEventsFake;
    }

    class RealBlock extends Block {}

    const blocks = {
        FakeBlock,
        RealBlock,
    };

    sinon.stub(blocks, "RealBlock").returns(new FakeBlock());

    beforeEach(() => {
        router.reset();
        getContentFake.resetHistory();
        dispatchComponentDidMountFake.resetHistory();
        removeEventsFake.resetHistory();
    });

    it("use() should return Router instance", () => {
        const result = router.use("/", blocks.RealBlock);

        expect(result).to.eq(router);
    });

    it("should render a page on start", () => {
        router.use("/", blocks.RealBlock).start();

        expect(dispatchComponentDidMountFake.callCount).to.eq(1);
    });

    describe(".back()", () => {
        it("should render a page on history back action", () => {
            router.use("/", blocks.RealBlock).start();

            router.back();

            expect(getContentFake.callCount).to.eq(2);
        });

        it("should remove events of current block in back action", () => {
            router.use("/", blocks.RealBlock).start();

            router.back();

            expect(removeEventsFake.called).to.eq(true);
        });
    });

    describe(".forward()", () => {
        it("should render a page on history forward action", () => {
            router.use("/", blocks.RealBlock).start();

            router.forward();

            expect(getContentFake.callCount).to.eq(2);
        });

        it("should remove events of current forward in back action", () => {
            router.use("/", blocks.RealBlock).start();

            router.forward();

            expect(removeEventsFake.called).to.eq(true);
        });
    });
});
