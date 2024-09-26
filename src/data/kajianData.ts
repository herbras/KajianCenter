import { JenisKajian, KategoriIlmu, StatusBiayaKajian } from '../lib/types/enums';

import { getValidatedKajianData } from '../lib/api/fetchKajianData';

export const kajians = await getValidatedKajianData();
export const allKategoriIlmu = Object.values(KategoriIlmu);
export const allJenisKajian = Object.values(JenisKajian);
export const allJenisStatus = Object.values(StatusBiayaKajian);
export const allKabupaten = [...new Set(kajians.map(kajian => kajian.alamat?.kabupaten).filter(kabupaten => kabupaten))];