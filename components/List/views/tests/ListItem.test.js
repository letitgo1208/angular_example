import React from 'react';
import renderer from 'react-test-renderer';
import { TestWrap } from 'utils/testing';
import ListItem from '../ListItem';

describe('ListItem padding', () => {
    it("should have just vertical padding if it's not a link and it has a border", () => {
        const tree = renderer
            .create(
                <TestWrap>
                    <ListItem />
                </TestWrap>
            )
            .toJSON();
        expect(tree).toHaveStyleRule('padding-top', '2rem');
        expect(tree).toHaveStyleRule('padding-bottom', '2rem');
        expect(tree).not.toHaveStyleRule('width', 'calc(100% + 4rem)');
        expect(tree).not.toHaveStyleRule('margin-left', '-2rem');
    });

    it("should have width, and negative left margin if horizontal padding if specified and it has a lower border, and it's a link", () => {
        const horizontalPadding = 4;
        const tree = renderer
            .create(
                <TestWrap>
                    <ListItem
                        to="/hello"
                        horizontalPadding={horizontalPadding}
                    />
                </TestWrap>
            )
            .toJSON();
        expect(tree).not.toHaveStyleRule('padding-left', '4rem');
        expect(tree).not.toHaveStyleRule('padding-right', '4rem');
        expect(tree).toHaveStyleRule('width', 'calc(100% + 8rem)');
        expect(tree).toHaveStyleRule('margin-left', '-4rem');
    });

    it("should have padding-left and right with no width and margin-left if there's no bottom border", () => {
        const horizontalPadding = 4;
        const tree = renderer
            .create(
                <TestWrap>
                    <ListItem
                        horizontalPadding={horizontalPadding}
                        variant="separated"
                    />
                </TestWrap>
            )
            .toJSON();
        expect(tree).toHaveStyleRule('padding-left', '4rem');
        expect(tree).toHaveStyleRule('padding-right', '4rem');
        expect(tree).not.toHaveStyleRule('width', 'calc(100% + 8rem)');
        expect(tree).not.toHaveStyleRule('margin-left', '-4rem');
    });

    it("should have padding-left and right with width and margin-left if there's a bottom border", () => {
        const horizontalPadding = 4;
        const tree = renderer
            .create(
                <TestWrap>
                    <ListItem horizontalPadding={horizontalPadding} />
                </TestWrap>
            )
            .toJSON();
        expect(tree).toHaveStyleRule('padding-left', '4rem');
        expect(tree).toHaveStyleRule('padding-right', '4rem');
        expect(tree).toHaveStyleRule('width', 'calc(100% + 8rem)');
        expect(tree).toHaveStyleRule('margin-left', '-4rem');
    });
});
