export default function cleanString(x: any, { required, minLength, maxLength, allowHtml, allowScripts, validValues }?: {
    required?: boolean;
    minLength?: boolean;
    maxLength?: boolean;
    allowHtml?: boolean;
    allowScripts?: boolean;
    validValues?: boolean;
}): string;
