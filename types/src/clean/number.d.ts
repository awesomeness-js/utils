export default function cleanNumber(x: any, { required, convertString, min, max, maxDecimal, minDecimal, }?: {
    required?: boolean | undefined;
    convertString?: boolean | undefined;
    min?: boolean | undefined;
    max?: boolean | undefined;
    maxDecimal?: boolean | undefined;
    minDecimal?: boolean | undefined;
}): any;
