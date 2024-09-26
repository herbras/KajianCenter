// Enum untuk Kategori Ilmu
export enum KategoriIlmu {
    Fiqh = "Fiqh",
    Aqidah = "Aqidah",
    Adab = "Adab",
  } 
  
  // Enum untuk Status Biaya Kajian
  export enum StatusBiayaKajian {
    Berbayar = "Berbayar",
    Gratis = "Gratis"
  }
  
  // Enum untuk Jenis Kajian
  export enum JenisKajian {
    Tematik = "Tematik",
    Rutin = "Rutin",
  }
  
  // Interface untuk Alamat
  export interface Alamat {
    jalan?: string;
    kabupaten: string;
    provinsi: string;
    kodepos: number;
  }
  
  // Interface untuk Ustadz/Pemateri
  export interface Pemateri {
    nama: string;
    deskripsiSingkat: string;
    foto?: string;
    kontak?: string;
  }
  
  // Interface untuk Contact Person
  export interface ContactPerson {
    nama: string;
    telepon: string;
    email?: string;
  }
  
  // Interface untuk Kajian
  export interface Kajian {
    judul: string;
    tempat: string;
    alamat?: Alamat;
    hariJadwal: string;
    linkGoogleMaps: string;
    gambarKajian?: string;
    deskripsi: string;
    contactPerson: ContactPerson;
    pemateri: Pemateri;
    jenisKajian?: JenisKajian;
    kategoriIlmu?: KategoriIlmu[];
    statusBiaya?: StatusBiayaKajian;
  }
  