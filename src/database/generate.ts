// Enum untuk Kategori Ilmu
enum KategoriIlmu {
  Fiqh = "Fiqh",
  Aqidah = "Aqidah",
  Adab = "Adab",
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
  kontak?: string; // Kontak ustadz/pemateri, bisa berupa nomor telepon atau email
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
  telepon: string; // Nomor telepon contact person
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
}

import { faker } from '@faker-js/faker';
export const allKategoriIlmu = Object.values(KategoriIlmu);
export const allJenisKajian = Object.values(JenisKajian);
export const allJenisStatus = Object.values(StatusBiayaKajian);
// Mengenerate satu entri data kajian
function generateKajian(): Kajian {
  return {
    judul: faker.lorem.sentence(),
    tempat: faker.lorem.word(),
    alamat: {
      jalan: faker.location.streetAddress(),
      kabupaten: faker.location.city(),
      provinsi: faker.location.state(),
      kodepos: parseInt(faker.location.zipCode()),
    },
    pemateri: {
      nama: faker.person.fullName(),
      deskripsiSingkat: faker.lorem.paragraph(),
      foto: faker.image.url(),
      kontak: faker.word.noun(),
    },
    hariJadwal: faker.date.soon().toISOString(),
    linkGoogleMaps: `https://maps.google.com/?q=${faker.location.latitude()},${faker.location.longitude()}`,
    gambarKajian: faker.image.url(),
    deskripsi: faker.lorem.paragraphs(2),
    contactPerson: {
      nama: faker.lorem.word(),
      telepon: faker.lorem.word(),
      email: faker.internet.email(),
    },
    jenisKajian: faker.helpers.arrayElement(allJenisKajian),
    statusBiaya: faker.helpers.arrayElement(allJenisStatus),
    kategoriIlmu: faker.helpers.arrayElements(allKategoriIlmu, faker.number.int({ min: 1, max: 1 })),
  };
}

export const dummyKajians: Kajian[] = Array.from({ length: 12 }, generateKajian);

export const allKabupaten = [...new Set(dummyKajians.map(kajian => kajian.alamat?.kabupaten).filter(kabupaten => kabupaten))];
