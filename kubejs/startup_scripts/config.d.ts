declare type packname = "grand_expanse";
declare function defineNames<T extends string>(
    arr: readonly T[]
): { [key in T]: `${packname}:${key}` };
