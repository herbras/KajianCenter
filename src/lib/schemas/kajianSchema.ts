import { JenisKajian, KategoriIlmu, StatusBiayaKajian } from '../types/enums';

import { z } from 'zod';

export const AlamatSchema = z.object({
    jalan: z.string().optional(),
    kabupaten: z.string(),
    provinsi: z.string(),
    kodepos: z.number(),
});

export const PemateriSchema = z.object({
    nama: z.string(),
    deskripsiSingkat: z.string(),
    foto: z.string().optional(),
    kontak: z.number().optional(),
});

export const ContactPersonSchema = z.object({
    nama: z.string(),
    telepon: z.number(),
    email: z.string().optional(),
});

export const KajianSchema = z.object({
    judul: z.string(),
    tempat: z.string(),
    alamat: AlamatSchema.optional(),
    hariJadwal: z.string(),
    linkGoogleMaps: z.string(),
    posterKajian: z.string().optional(),
    deskripsi: z.string(),
    contactPerson: ContactPersonSchema,
    pemateri: PemateriSchema,
    jenisKajian: z.nativeEnum(JenisKajian).optional(),
    kategoriIlmu: z.array(z.nativeEnum(KategoriIlmu)).optional(),
    statusBiaya: z.nativeEnum(StatusBiayaKajian).optional(),
    slug: z.string(),
});

export const KajiansSchema = z.array(KajianSchema);