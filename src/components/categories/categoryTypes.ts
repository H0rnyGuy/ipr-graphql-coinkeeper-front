export enum CategoryTypes {
    default = 1,
    custom = 2,
    edited = 3
}

export const CategoryTypeText: Record<CategoryTypes, string> = {
    [CategoryTypes.default]: "Default Category",
    [CategoryTypes.custom]: "Custom Category",
    [CategoryTypes.edited]: "Edited Category",
};