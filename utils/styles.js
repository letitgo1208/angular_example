export const elasticWidth = ({ theme, width }) => {
    if (width === 'auto' || typeof width === 'undefined') return 'auto';
    if (typeof width === 'string' && width.indexOf('%') > -1) {
        return width;
    }
    return `${theme.szb * width}rem`;
};
