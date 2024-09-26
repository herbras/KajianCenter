import { addYears, isAfter } from 'date-fns';

function julianDate(date: Date): number {
    return (date.getTime() / 86400000) + 2440587.5;
}

function hijriToGregorian(year: number, month: number, day: number): Date {
    let jd = Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day + 1948440 - 385;

    let z = Math.floor(jd + 0.5);
    let a = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + a - Math.floor(a / 4);
    let b = a + 1524;
    let c = Math.floor((b - 122.1) / 365.25);
    let d = Math.floor(365.25 * c);
    let e = Math.floor((b - d) / 30.6001);

    let day2 = b - d - Math.floor(30.6001 * e);
    let month2 = e - (e > 13.5 ? 13 : 1);
    let year2 = c - (month2 > 2.5 ? 4716 : 4715);

    return new Date(year2, month2 - 1, day2);
}

function getFirstRamadanDate(gregorianYear: number): Date {
    // Perkiraan tahun Hijriah
    let hijriYear = Math.floor((gregorianYear - 622) * 32 / 33) + 1;

    // 1 Ramadhan adalah bulan ke-9 dalam kalender Hijriah
    return hijriToGregorian(hijriYear, 9, 1);
}

export function getNextRamadanDate(): Date {
    const today = new Date();
    let nextRamadan = getFirstRamadanDate(today.getFullYear());

    if (isAfter(today, nextRamadan)) {
        nextRamadan = getFirstRamadanDate(today.getFullYear() + 1);
    }

    return nextRamadan;
}