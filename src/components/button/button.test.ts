/* eslint-disable max-classes-per-file */
import { describe, it } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import { ButtonComponent } from "./button.ts";

const defaultTextPropValue = "test";

describe("Button", async () => {
    it("should have text value after init", () => {
        const button = new ButtonComponent({ text: defaultTextPropValue });
        expect(button.getContent()?.textContent).to.be.eq(defaultTextPropValue);
    });

    it("should add events", () => {
        const fakeClickFunction = sinon.fake.returns(undefined);
        const component = new ButtonComponent({
            text: defaultTextPropValue,
            events: {
                click: fakeClickFunction,
            },
        });

        component.getContent()?.click();

        expect(fakeClickFunction.calledOnce).to.eq(true);
    });

    it("should save events after updatings props", () => {
        const fakeClickFunction = sinon.fake.returns(undefined);
        const component = new ButtonComponent({
            text: defaultTextPropValue,
            events: {
                click: fakeClickFunction,
            },
        });

        component.setProps({ text: "new text value" });
        component.getContent()?.click();

        expect(fakeClickFunction.calledOnce).to.eq(true);
    });

    it("should change type by props", () => {
        const component = new ButtonComponent({
            text: defaultTextPropValue,
            type: "submit",
        });

        expect(component.getContent()?.getAttribute("type")).to.eq("submit");
    });

    it("should add css classes", () => {
        const component = new ButtonComponent({
            text: defaultTextPropValue,
            classNames: "test",
        });

        expect(component.getContent()?.getAttribute("class")).contains("test");
    });
});
