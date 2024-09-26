<script>
    import moment from "moment";
    import { kajianStore } from "@components/store.js";
    import { formatDate, formatTime, formatDateTime } from '@utils/dateUtils';

    export let kajians;
    kajianStore.subscribe((value) => {
        kajians = value;
    });
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each $kajianStore as kajian, index}
        <article
            key={index}
            class="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg"
        >
            <img
                src={kajian.gambarKajian ||
                    "https://pbs.twimg.com/media/GBRTGrpaAAAgmD2?format=jpg&name=large"}
                alt={`Poster Kajian ${kajian.judul}`}
                class="absolute inset-0 h-full w-full object-cover"
            />

            <div
                class="relative bg-gradient-to-t h-full from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64"
            >
                <div class="p-4 sm:p-6">
                    <label class="flex-inline">
                        <div class="i-fluent-emoji-sun w-5 h-5 text-black" />
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
                    </label>

                    <a href={`/${kajian.slug}`}>
                        <h3 class="mt-0.5 text-4xl text-white">
                            {kajian.judul}
                        </h3>
                    </a>
                    <div class="i-fluent-emoji-mosque h-5 w-5" />
                    <div class="text-sm">
                        <p class="m-0 p-0 text-gray-100">{kajian.tempat}</p>

                        {#if kajian.alamat && kajian.alamat.jalan}
                            <p class="m-0 p-0 text-gray-200">
                                {kajian.alamat.kabupaten} , {kajian.alamat
                                    .provinsi}
                            </p>
                        {/if}
                    </div>
                    <slot name="time"></slot>

                    <time
                        class="block text-xs text-white"
                        datetime={formatDateTime(kajian.hariJadwal)}
                    >
                        <span class="text-white"
                            >{formatDate(kajian.hariJadwal)}</span
                        >
                        <span class="text-white"
                            >@ {formatTime(kajian.hariJadwal)}</span
                        >
                    </time>
                </div>
            </div>
        </article>
    {/each}
</div>
