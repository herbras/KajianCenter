import { format, parseISO } from 'date-fns';

import { id } from 'date-fns/locale';

export function formatDate(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, "yyyy-MM-dd");
}

/* 
export function formatDate(dateString: string): string {
    const date = parseISO(dateString);
    let formattedDate = format(date, "EEEE", { locale: id });
    return formattedDate === "Minggu" ? "Ahad" : formattedDate;
}
*/

export function formatTime(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, "hh:mm a");
}

export function formatDateTime(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, "yyyy-MM-dd'T'HH:mm:ss");
}

export function formatStartDateTime(startTime: string): string {
    const date = parseISO(startTime);
    return format(date, "yyyyMMdd'T'HHmm00");
}