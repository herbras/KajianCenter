// store.js
import { writable } from 'svelte/store';

// Store untuk menyimpan data kajian
export const kajianStore = writable([]);

// Store untuk menyimpan filter yang dipilih
export const filterStore = writable({
  jenisKajian: '',
  kategoriIlmu: '',
  status: '',
  kabupaten: ''
});
