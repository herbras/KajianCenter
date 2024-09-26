<script>
  
    // Data acara (contoh menggunakan data statis)
    export let event 
  
    function saveToCalendar() {
      const { title, description, location, startTime } = event;
      
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        `DTSTART:${startTime}`,
        'END:VEVENT',
        'END:VCALENDAR',
      ].join('\r\n');
  
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${title.replace(/\s/g, '_')}.ics`; // Replace spaces with underscores
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  </script>
  
  <button
  class="border decoration-none text-base tracking-tight  border-blue-200 inline-flex justify-between items-center py-2 px-3 text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 font-medium px-2.5 py-0.5 cursor-pointer bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 font-medium rounded mb-2"
  on:click={saveToCalendar}
  >
    Save to Calendar
  </button>
  