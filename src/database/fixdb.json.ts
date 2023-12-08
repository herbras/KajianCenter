import { z } from 'zod';
import { cleanSlug } from '../utils/slugFunction';

// Enum untuk Kategori Ilmu
enum KategoriIlmu {
    Fiqh = "Fiqh",
    Aqidah = "Aqidah",
    Adab = "Adab",
    Tafsir = "Tafsir",
}

enum StatusBiayaKajian {
    Berbayar = "Berbayar",
    Gratis = "Gratis"
}


// Enum untuk Jenis Kajian
enum JenisKajian {
    Tematik = "Tematik",
    Rutin = "Rutin",
}
// Interface untuk Ustadz/Pemateri
interface Pemateri {
    nama: string;
    deskripsiSingkat: string; // Deskripsi singkat tentang ustadz/pemateri
    foto?: string; // URL ke foto ustadz/pemateri, opsional
    kontak?: number; // Kontak ustadz/pemateri, bisa berupa nomor telepon atau email
}
interface Alamat {
    jalan?: string; // Nama jalan, opsional
    kabupaten: string;
    provinsi: string;
    kodepos: number;
}

// Interface untuk Contact Person
interface ContactPerson {
    nama: string;
    telepon: number; // Nomor telepon contact person
    email?: string; // Email contact person, opsional
}


// Interface untuk Kajian
interface Kajian {
    judul: string;
    tempat: string; // Nama masjid atau lokasi kajian
    alamat?: Alamat;
    hariJadwal: string; // Harus disimpan dalam format yang konsisten, misal ISO 8601 untuk tanggal
    linkGoogleMaps: string; // URL ke Google Maps
    gambarKajian?: string; // URL ke gambar kajian, opsional
    deskripsi: string;
    contactPerson: ContactPerson;
    pemateri: Pemateri; // Menambahkan pemateri ke dalam Kajian
    jenisKajian?: JenisKajian; // Opsional untuk MVP, diperlukan untuk fitur lanjutan
    kategoriIlmu?: KategoriIlmu[]; // Array, opsional untuk MVP, diperlukan untuk fitur lanjutan
    statusBiaya?: StatusBiayaKajian;
    slug?: string;
}
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

const AlamatSchema = z.object({
    jalan: z.string().optional(),
    kabupaten: z.string(),
    provinsi: z.string(),
    kodepos: z.number(),
});

const PemateriSchema = z.object({
    nama: z.string(),
    deskripsiSingkat: z.string(),
    foto: z.string().optional(),
    kontak: z.number().optional(),
});

const ContactPersonSchema = z.object({
    nama: z.string(),
    telepon: z.number(),
    email: z.string().optional(),
});

const KajianSchema = z.object({
    judul: z.string(),
    tempat: z.string(),
    alamat: AlamatSchema.optional(),
    hariJadwal: z.string(),
    linkGoogleMaps: z.string(),
    gambarKajian: z.string().optional(),
    deskripsi: z.string(),
    contactPerson: ContactPersonSchema,
    pemateri: PemateriSchema,
    jenisKajian: z.nativeEnum(JenisKajian).optional(),
    kategoriIlmu: z.array(z.nativeEnum(KategoriIlmu)).optional(),
    statusBiaya: z.nativeEnum(StatusBiayaKajian).optional(),
    slug: z.string(),
});

const KajiansSchema = z.array(KajianSchema);
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

export const kajians = await getValidatedKajianData();
export const allKategoriIlmu = Object.values(KategoriIlmu);
export const allJenisKajian = Object.values(JenisKajian);
export const allJenisStatus = Object.values(StatusBiayaKajian);
export const allKabupaten = [...new Set(kajians.map(kajian => kajian.alamat?.kabupaten).filter(kabupaten => kabupaten))];
