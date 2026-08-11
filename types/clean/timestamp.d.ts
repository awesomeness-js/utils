export default function cleanTimestamp(isoDateTimeString: any, { required, maxDaysInFuture, maxDaysInFPast, }?: {
    required?: boolean | undefined;
    maxDaysInFuture?: boolean | undefined;
    maxDaysInFPast?: boolean | undefined;
}): string | null;
