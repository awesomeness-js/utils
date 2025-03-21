export default function cleanTimestamp(isoDateTimeString: any, { required, maxDaysInFuture, maxDaysInFPast, }?: {
    required?: boolean;
    maxDaysInFuture?: boolean;
    maxDaysInFPast?: boolean;
}): string;
