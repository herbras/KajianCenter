<script>
  import { onMount } from "svelte";

  import { filterStore } from "./store.js";

  let isOpen = false;

  function toggleSidebar() {
    isOpen = !isOpen;
  }

  const jenisKajianOptions = ["Tematik", "Rutin", "Kitab", "Dauroh"];
  const kategoriIlmuOptions = ["Fiqh", "Aqidah", "Adab", "Tafsir"];
  const jenisStatusOptions = ["Berbayar", "Gratis"];

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    filterStore.set({
      jenisKajian: params.get("jenisKajian") || "",
      kategoriIlmu: params.get("kategoriIlmu") || "",
      statusOptions: params.get("status") || "",
    });

    const handleResize = () => {
      if (window.innerWidth > 768) {
        isOpen = true;
        document.body.classList.add('sidebar-open');
      } else {
        isOpen = false;
        document.body.classList.remove('sidebar-open');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };  });

// Fungsi pembantu untuk menggabungkan semua filter menjadi satu string query URL
function createQueryString() {
  const params = new URLSearchParams();
  filterStore.subscribe((filters) => {
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.set(key, filters[key]);
    });
  });
  return params.toString();
}

// Di dalam komponen SideNav dan Location


// Update fungsi selectOption dan setKabupatenFilter
function selectOption(type, value) {
  filterStore.update((filters) => {
    return { ...filters, [type]: value };
  });
  handleFilterChange();
}




function handleFilterChange() {
  const queryString = createQueryString();
  window.history.pushState({}, "", `/search/search?${queryString}`);
}

 
  function resetFilters() {
    filterStore.set({
      jenisKajian: "",
      kategoriIlmu: "",
      statusOptions: "",
      kabupaten: "",
    });
    window.history.pushState({}, "", window.location.pathname);
  }
  function handleHtmxClick(url, target) {
    htmx.ajax("GET", url, target);
  }
</script>
<div class="relative">

<button
class="md:hidden fixed bottom-4 right-4 z-50 bg-white p-3 rounded-full shadow-md text-2xl"
on:click={toggleSidebar}
  >
    {#if isOpen}
      ✕
    {:else}
      ☰
    {/if}
  </button>

<div
class="fixed top-0 left-0 z-60 h-screen w-64 flex flex-col justify-between bg-white border-r overflow-y-auto transition-transform duration-300 ease-in-out {isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0"
>
  <div class="px-4 py-6">
    <span class="grid p-1 place-content-center">
      <a
        href="/"
        class="decoration-none text-2xl font-bold flex text-gray-700 items-end gap-2"
      >
        <img src="/logo.webp" alt="icon" class="aspect-square w-12 h-12" />
        Kajian
      </a>
    </span>

    <ul class="mt-6 list-none pl-0 space-y-1">
      <li
        class="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
      >
        Kategori
      </li>

      <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span class="text-sm font-medium">Jenis Kajian</span>

            <span
              class="shrink-0 transition duration-300 group-open:-rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </summary>

          <ul class="mt-2 list-none space-y-1 px-4">
            {#each jenisKajianOptions as jenis}
              <li>
                <button
                  class="block w-full text-left rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  on:click={() => {
                    selectOption("jenisKajian", jenis);
                    handleHtmxClick(
                      `/search/search?jenisKajian=${jenis}`,
                      "#tempat",
                    );
                  }}
                >
                  {jenis}
                </button>
              </li>
            {/each}
          </ul>
        </details>
      </li>

      <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span class="text-sm font-medium"> Status Kajian</span>

            <span
              class="shrink-0 transition duration-300 group-open:-rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </summary>

          <ul class="mt-2 list-none space-y-1 px-4">
            {#each jenisStatusOptions as bref}
              <li>
                <button
                  class="block w-full text-left rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  on:click={() => {
                    selectOption("statusOptions", bref);
                    handleHtmxClick(
                      `/search/search?statusOptions=${bref}`,
                      "#tempat",
                    );
                  }}
                >
                  {bref}
                </button>
              </li>
            {/each}
          </ul>
        </details>
      </li>

      <li>
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span class="text-sm font-medium"> Tema Kajian</span>

            <span
              class="shrink-0 transition duration-300 group-open:-rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </summary>

          <ul class="mt-2 list-none space-y-1 px-4">
            {#each kategoriIlmuOptions as kategori}
              <li>
                <button
                  class="block w-full text-left rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  on:click={() => {
                    selectOption("kategoriIlmu", kategori);
                    handleHtmxClick(
                      `/search/search?kategoriIlmu=${kategori}`,
                      "#tempat",
                    );
                  }}
                >
                  {kategori}
                </button>
              </li>
            {/each}
          </ul>
        </details>
      </li>
      <li
        class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        Cafe Favorit
      </li>
      <li
        class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        Poster Islami
      </li>
      <li
        class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        Freebies
      </li>
    </ul>
    <button
      on:click={resetFilters}
      on:click={() => {
        resetFilters();
        handleHtmxClick(`/`, "#tempat");
      }}
      class="border decoration-none text-base tracking-tight border-blue-200 inline-flex justify-between items-center py-2 px-3 text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 font-medium px-2.5 py-0.5 cursor-pointer bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 font-medium rounded mb-2"
    >
      Reset Filters
    </button>
    <a
      href={`/form`}
      hx-get={`/form`}
      hx-target="#tempat"
      hx-swap="innerHTML"
      hx-push-url={`/form`}
      class="border decoration-none text-base tracking-tight border-blue-200 inline-flex justify-between items-center py-2 px-3 text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 font-medium px-2.5 py-0.5 cursor-pointer bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 font-medium rounded mb-2"
    >
      Berkontribusi
    </a>
  </div>

  <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
    <a
      href={`/about`}
      hx-get={`/about`}
      hx-push-url={`/about`}
      hx-target="#tempat"
      hx-swap="innerHTML"
      class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
    >
      <img
        alt="Man"
        src="https://main--herbras.netlify.app/assets/icon.webp"
        class="h-10 w-10 rounded-full object-cover"
      />

      <div>
        <p class="text-xs">
          <strong class="block font-medium">PT Cahaya Petunjuk Inovasi</strong>

          <span> by Sarbeh</span>
        </p>
      </div>
    </a>
  </div>
</div>
{#if isOpen}
<div
  class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
  on:click={toggleSidebar}
></div>
{/if}
</div>

<style>
  @media (min-width: 768px) {
    .md\:translate-x-0 {
      transform: translateX(0);
    }
  }
</style>