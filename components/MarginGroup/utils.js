export const margin = ({ theme, size, margin: marginValue }) => {
    if (marginValue) return `${marginValue}rem`;
    const sizes = {
        xs: theme.sp.xs,
        sm: theme.sp.sm,
        md: theme.sp.md,
        lg: theme.sp.lg,
    };
    return sizes[size];
};
