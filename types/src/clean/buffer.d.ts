export default function cleanBuffer(fileObj: any, { required, validTypes, minSize, maxSize, }?: {
    required?: boolean | undefined;
    validTypes?: never[] | undefined;
    minSize?: boolean | undefined;
    maxSize?: boolean | undefined;
}): {
    name: any;
    type: any;
    size: number;
    buffer: any;
    encoding: any;
    createdAt: string;
} | null;
