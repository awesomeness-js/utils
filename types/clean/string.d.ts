export default function cleanString(x: any, { required, minLength, maxLength, allowHtml, allowScripts }?: {
    required?: boolean;
    minLength?: boolean;
    maxLength?: boolean;
    allowHtml?: boolean;
    allowScripts?: boolean;
}): string;
