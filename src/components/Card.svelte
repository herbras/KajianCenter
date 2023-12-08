<script>
  import { onMount, createEventDispatcher } from "svelte";
  import {
    allJenisKajian,
    allKabupaten,
    allKategoriIlmu,
    kajians,
    allJenisStatus,
  } from "../database/fixdb.json";
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
        kajians.filter(
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

