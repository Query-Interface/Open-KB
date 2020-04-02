// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reorder = (lists: Array<any>, startIndex: number, endIndex: number): Array<any>=> {
    const result = lists.slice();
    const [moved] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, moved);
    return result;
};
