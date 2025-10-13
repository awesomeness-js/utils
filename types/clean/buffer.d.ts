export default function cleanBuffer(fileObj: any, { required, validTypes, minSize, maxSize, }?: {
    required?: boolean;
    validTypes?: any[];
    minSize?: boolean;
    maxSize?: boolean;
}): {
    name: any;
    type: any;
    size: number;
    encoding: any;
    createdAt: string;
};
