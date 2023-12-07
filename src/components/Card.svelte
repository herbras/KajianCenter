<script>
  import { onMount, createEventDispatcher } from "svelte";
  import moment from "moment";
  import {
    allJenisKajian,
    allKabupaten,
    allKategoriIlmu,
    dummyKajians,
    allJenisStatus,
  } from "../database/generate";
  import { kajianStore, filterStore } from "./store.js";

  const dispatch = createEventDispatcher();

  const jenisKajianOptions = allJenisKajian;
  const kategoriIlmuOptions = allKategoriIlmu;
  const jenisStatusOptions = allJenisStatus;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    filterStore.set({
      jenisKajian: params.get("jenisKajian") || "",
      kategoriIlmu: params.get("kategoriIlmu") || "",
      statusOptions: params.get("status") || "",
      kabupaten: params.get("kabupaten") || "",
    });
    applyFilters();
  });

  function handleFilterChange() {
    const params = new URLSearchParams();

    filterStore.subscribe((filters) => {
      if (filters.jenisKajian) params.set("jenisKajian", filters.jenisKajian);
      if (filters.kategoriIlmu)
        params.set("kategoriIlmu", filters.kategoriIlmu);
      if (filters.statusOptions) params.set("status", filters.statusOptions);
      if (filters.kabupaten) params.set("kabupaten", filters.kabupaten);
    });

    history.replaceState({}, "", "?" + params.toString());
    applyFilters();
  }

  function applyFilters() {
    filterStore.subscribe((filters) => {
      kajianStore.set(
        dummyKajians.filter(
          (kajian) =>
            (!filters.jenisKajian ||
              kajian.jenisKajian === filters.jenisKajian) &&
            (!filters.kategoriIlmu ||
              kajian.kategoriIlmu?.includes(filters.kategoriIlmu)) &&
            (!filters.kabupaten ||
              kajian.alamat?.kabupaten === filters.kabupaten) &&
            (!filters.statusOptions ||
              kajian.statusBiaya === filters.statusOptions),
        ),
      );
    });
    dispatch("filterChange");
  }
</script>

<div class="flex flex-col gap-4">
  <select
    bind:value={$filterStore.jenisKajian}
    on:change={handleFilterChange}
    class="p-2 rounded border border-gray-300"
  >
    <option value="">Pilih Jenis Kajian</option>
    {#each jenisKajianOptions as jenis}
      <option value={jenis}>{jenis}</option>
    {/each}
  </select>
  <select
    bind:value={$filterStore.statusOptions}
    on:change={handleFilterChange}
    class="p-2 rounded border border-gray-300"
  >
    <option value="">Pilih status</option>
    {#each jenisStatusOptions as status}
      <option value={status}>{status}</option>
    {/each}
  </select><select
    bind:value={$filterStore.kabupaten}
    on:change={handleFilterChange}
    class="p-2 rounded border border-gray-300"
  >
    <option value="">Pilih Kabupaten</option>
    {#each allKabupaten as kabupaten}
      <option value={kabupaten}>{kabupaten}</option>
    {/each}
  </select>

  <select
    bind:value={$filterStore.kategoriIlmu}
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
  {#each $kajianStore as kajian, index}
    <div key={index} class="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={kajian.gambarKajian || "default-image-url"}
        alt={`Poster Kajian ${kajian.judul}`}
        class="w-full h-32 sm:h-48 object-cover"
      />
      <div class="p-4">
        <h5 class="text-lg font-bold">{kajian.judul}</h5>
        <span
          class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1"
        >
          {kajian.pemateri.nama}
        </span>
        <span
          class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 last:mr-0 mr-1"
        >
          {kajian.statusBiaya}
        </span>
        <p class="text-sm text-gray-600">{kajian.tempat}</p>
        {#if kajian.alamat && kajian.alamat.jalan}
          <p class="text-sm text-gray-500">{kajian.alamat.kabupaten}</p>
        {/if}
        <p class="text-sm">
          {moment(kajian.hariJadwal).format("dddd, D MMMM YYYY")}
        </p>

        <a
          href={kajian.linkGoogleMaps}
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 text-sm hover:underline">View on Map</a
        >
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
