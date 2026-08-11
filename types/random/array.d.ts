export default randomArray;
declare function randomArray({ items, min, max }?: {
    items?: {
        type: string;
        minLength: number;
        maxLength: number;
    } | undefined;
    min?: number | undefined;
    max?: number | undefined;
}): any[];
