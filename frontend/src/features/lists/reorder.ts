
export const reorder = (lists: Array<any>, startIndex: number, endIndex: number) => {
    const result = lists.slice();
    const [moved] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, moved);
    return result;
};
