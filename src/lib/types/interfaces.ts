export interface Pemateri {
    nama: string;
    deskripsiSingkat: string;
    foto?: string;
    kontak?: number;
}

export interface Alamat {
    jalan?: string;
    kabupaten: string;
    provinsi: string;
    kodepos: number;
}

export interface ContactPerson {
    nama: string;
    telepon: number;
    email?: string;
}

export interface Kajian {
    judul: string;
    tempat: string;
    alamat?: Alamat;
    hariJadwal: string;
    linkGoogleMaps: string;
    posterKajian?: string;
    deskripsi: string;
    contactPerson: ContactPerson;
    pemateri: Pemateri;
    jenisKajian?: JenisKajian;
    kategoriIlmu?: KategoriIlmu[];
    statusBiaya?: StatusBiayaKajian;
    slug?: string;
}