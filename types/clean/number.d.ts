export default function cleanNumber(x: any, { required, convertString, min, max, maxDecimal, minDecimal, }?: {
    required?: boolean;
    convertString?: boolean;
    min?: boolean;
    max?: boolean;
    maxDecimal?: boolean;
    minDecimal?: boolean;
}): any;
