/* eslint-disable max-classes-per-file */
import { describe, it } from "mocha";
import { expect } from "chai";

import { Block } from "./block.ts";

const defaultPropValue = 1;

describe("Block", async () => {
    class ComponentMock extends Block<{ test?: number }> {
        protected render() {
            const temp = document.createElement("template");
            temp.innerHTML = `<div><div>`;
            return temp.content;
        }
    }

    it("should return be rendered after init", () => {
        const component = new ComponentMock({});
        expect(component.getContent()).to.be.instanceOf(window.HTMLDivElement);
    });

    it("should update have props after init", () => {
        const component = new ComponentMock({ test: defaultPropValue });
        expect(component.props.test).to.eq(defaultPropValue);
    });

    it("should update props", () => {
        const component = new ComponentMock({ test: defaultPropValue });

        const newTestValue = 2;
        component.setProps({ test: newTestValue });
        expect(component.props.test).to.eq(newTestValue);
    });
});
