<script>
    import { onMount, onDestroy } from "svelte";

    function getNextRamadanDate() {
        const today = new Date();
        let currentYear = today.getFullYear();
        let ramadanDate = new Date(currentYear, 0, 1);
        
        const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-nu-latn', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });

        let iterationCount = 0;
        const maxIterations = 1000; // Prevent infinite loop

        while (iterationCount < maxIterations) {
            const parts = hijriFormatter.formatToParts(ramadanDate);
            const month = parts.find(part => part.type === 'month')?.value;
            const day = parts.find(part => part.type === 'day')?.value;
            
            if (parseInt(month) === 9 && parseInt(day) === 1) {
                if (ramadanDate > today) {
                    console.log('Next Ramadan date found:', ramadanDate);
                    return ramadanDate;
                }
            }
            
            ramadanDate.setDate(ramadanDate.getDate() + 1);
            if (ramadanDate.getFullYear() > currentYear + 1) {
                currentYear++;
                ramadanDate = new Date(currentYear, 0, 1);
            }

            iterationCount++;
        }

        console.error('Failed to find next Ramadan date within reasonable iterations');
        return new Date(); 
    }

    let ramadanDate = getNextRamadanDate();
    console.log('Initial Ramadan date:', ramadanDate);
    
    let countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    function updateCountdown() {
        const now = new Date();
        if (!ramadanDate || now >= ramadanDate) {
            ramadanDate = getNextRamadanDate();
            console.log('Updated Ramadan date:', ramadanDate);
        }

        if (ramadanDate) {
            const diff = ramadanDate.getTime() - now.getTime();
            
            countdown = {
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000)
            };
        } else {
            console.error('Invalid Ramadan date');
        }
    }

    let interval;

    onMount(() => {
        updateCountdown();
        interval = setInterval(updateCountdown, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    $: countdownArray = Object.entries(countdown);

    const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
</script>

<div class="bg-white shadow-lg rounded-lg p-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {#each countdownArray as [key, value]}
            <div>
                <p class="text-2xl font-semibold text-gray-800">
                    {key[0].toUpperCase() + key.slice(1)}
                </p>
                <p class="text-6xl font-bold text-gray-800 tabular-nums">
                    {value.toString().padStart(2, "0")}
                </p>
            </div>
        {/each}
    </div>
    <h2 class="text-3xl font-bold text-center mb-8">
        {#if ramadanDate}
            Ramadan will, inshaAllah, be coming on {ramadanDate.toLocaleDateString(
                "en-US",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }
            )} 
            <br>
            ({hijriFormatter.format(ramadanDate)}) 🌙✨
        {:else}
            Calculating next Ramadan date...
        {/if}
    </h2>
    <a href="https://ramadan.zakiego.com/" class="block mt-4 text-center text-gray-700 hover:text-gray-500">
        Kunjungi Ramadhan Countdown karya Zaki
    </a>
</div>