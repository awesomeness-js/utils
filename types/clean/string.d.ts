export default function cleanString(x: any, { required, minLength, maxLength, allowHtml, allowScripts, validValues, format, pattern }?: {
    required?: boolean | undefined;
    minLength?: boolean | undefined;
    maxLength?: boolean | undefined;
    allowHtml?: boolean | undefined;
    allowScripts?: boolean | undefined;
    validValues?: boolean | undefined;
    format?: boolean | undefined;
    pattern?: boolean | undefined;
}): string | null;
