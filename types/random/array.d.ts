export default randomArray;
declare function randomArray({ items, min, max }?: {
    items?: {
        type: string;
        minLength: number;
        maxLength: number;
    };
    min?: number;
    max?: number;
}): any[];
