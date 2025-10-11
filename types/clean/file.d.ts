export default function cleanFile(file: any, { required, validTypes, minSize, maxSize, }?: {
    required?: boolean;
    validTypes?: any[];
    minSize?: boolean;
    maxSize?: boolean;
}): {
    name: any;
    type: any;
    size: any;
    lastModified: string;
};
