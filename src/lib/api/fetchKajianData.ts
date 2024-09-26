import type { Kajian } from '../types/interfaces';
import { KajiansSchema } from '../schemas/kajianSchema';
import { cleanSlug } from '../../utils/slugFunction';

async function fetchKajianData(): Promise<Kajian[]> {
    try {
        const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=tLpqOjya-kBrlEOsHdXo4PF5Bk2niNwMIsatRnaBFNh-v3Om_cXXCO3U1EZ3TjU-OfbWugldXz47386A38tNrjpXejShOj6jm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNKHmQjE7wNggG7YMpICnWPSoUTZetW5qcZmKGbqqloENSLf0_PfBxVj9rbQcTwzhPKi5H5hAWJ_7lSV_uMUwlQG54R8fO9Rmtz9Jw9Md8uu&lib=Mlx3rsXU4bQVNyMP6cU0E0_8Y1bAqMqQH');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const kajiansWithSlug = data.Kajian.map((kajian: Kajian) => ({
            ...kajian,
            slug: cleanSlug(kajian.judul)
        }));

        return kajiansWithSlug;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return [];
    }
}

export async function getValidatedKajianData(): Promise<Kajian[]> {
    const rawData = await fetchKajianData();
    if (!Array.isArray(rawData)) {
        console.error("API response is not an array.");
        return [];
    }
    const result = KajiansSchema.safeParse(rawData);

    if (!result.success) {
        console.error("Validation failed", result.error);
        return [];
    }

    return result.data;
}