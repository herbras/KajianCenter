<script>
  import { createEventDispatcher } from "svelte";
  import {
    allJenisKajian,
    allKabupaten,
    allKategoriIlmu,
    dummyKajians,
  } from "../database/generate";
  let filteredKajians = [...dummyKajians];

  const dispatch = createEventDispatcher();
  let selectedJenisKajian = "";
  let selectedKategoriIlmu = "";

  const jenisKajianOptions = allJenisKajian;
  const kategoriIlmuOptions = allKategoriIlmu;

  function handleFilterChange() {
    dispatch("filterChange", {
      selectedJenisKajian,
      selectedKategoriIlmu,
    });
    applyFilters();
  }

  let selectedKabupaten = "";

  function applyFilters() {
    filteredKajians = dummyKajians.filter(
      (kajian) =>
        (!selectedJenisKajian || kajian.jenisKajian === selectedJenisKajian) &&
        (!selectedKategoriIlmu ||
          kajian.kategoriIlmu?.includes(selectedKategoriIlmu)) &&
        (!selectedKabupaten || kajian.alamat?.kabupaten === selectedKabupaten),
    );
  }
</script>

<div class="flex flex-col gap-4">
  <select
    bind:value={selectedJenisKajian}
    on:change={handleFilterChange}
    class="p-2 rounded border border-gray-300"
  >
    <option value="">Pilih Jenis Kajian</option>
    {#each jenisKajianOptions as jenis}
      <option value={jenis}>{jenis}</option>
    {/each}
  </select>
  <select
    bind:value={selectedKabupaten}
    on:change={handleFilterChange}
    class="p-2 rounded border border-gray-300"
  >
    <option value="">Pilih Kabupaten</option>
    {#each allKabupaten as kabupaten}
      <option value={kabupaten}>{kabupaten}</option>
    {/each}
  </select>

  <select
    bind:value={selectedKategoriIlmu}
    on:change={handleFilterChange}
    class="p-2 rounded border border-gray-300"
  >
    <option value="">Pilih Kategori Ilmu</option>
    {#each kategoriIlmuOptions as kategori}
      <option value={kategori}>{kategori}</option>
    {/each}
  </select>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each filteredKajians as kajian, index}
    <div key={index} class="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={kajian.gambarKajian || "default-image-url"}
        alt={`Gambar Kajian ${kajian.judul}`}
        class="w-full h-32 sm:h-48 object-cover"
      />
      <div class="p-4">
        <h5 class="text-lg font-bold">{kajian.judul}</h5>
        <p class="text-sm text-gray-600">{kajian.tempat}</p>
        {#if kajian.alamat && kajian.alamat.jalan}
          <p class="text-sm text-gray-500">{kajian.alamat.jalan}</p>
        {/if}
        <p class="text-sm">{kajian.hariJadwal}</p>
        <a
          href={kajian.linkGoogleMaps}
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 text-sm hover:underline">View on Map</a
        >
        <p class="mt-2 text-sm text-gray-700">{kajian.deskripsi}</p>
        <div class="mt-3">
          <span
            class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1"
          >
            {kajian.jenisKajian}
          </span>
          {#if kajian.kategoriIlmu}
            {#each kajian.kategoriIlmu as kategori, idx}
              <span
                key={idx}
                class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 last:mr-0 mr-1"
              >
                {kategori}
              </span>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>
