// Enum untuk Kategori Ilmu
 enum KategoriIlmu {
    Fiqh = "Fiqh",
    Aqidah = "Aqidah",
    Adab = "Adab",
  } 
  
  // Enum untuk Status Biaya Kajian
   enum StatusBiayaKajian {
    Berbayar = "Berbayar",
    Gratis = "Gratis"
  }
  
  // Enum untuk Jenis Kajian
   enum JenisKajian {
    Tematik = "Tematik",
    Rutin = "Rutin",
  }
  
  // Interface untuk Alamat
   interface Alamat {
    jalan?: string;
    kabupaten: string;
    provinsi: string;
    kodepos: number;
  }
  
  // Interface untuk Ustadz/Pemateri
   interface Pemateri {
    nama: string;
    deskripsiSingkat: string;
    foto?: string;
    kontak?: string;
  }
  
  // Interface untuk Contact Person
   interface ContactPerson {
    nama: string;
    telepon: string;
    email?: string;
  }
  
  // Interface untuk Kajian
   interface Kajian {
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
  