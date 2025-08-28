export default function cleanString(x: any, { required, minLength, maxLength, allowHtml, allowScripts, validValues, format, pattern }?: {
    required?: boolean;
    minLength?: boolean;
    maxLength?: boolean;
    allowHtml?: boolean;
    allowScripts?: boolean;
    validValues?: boolean;
    format?: boolean;
    pattern?: boolean;
}): string;
