function getNextRamadanDate(): Date {
    const today = new Date();
    let currentYear = today.getFullYear();
    let ramadanDate = new Date(currentYear, 0, 1); // Start from January 1st of current year
    
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
            // If we've gone past next year, start over from January 1st of next year
            currentYear++;
            ramadanDate = new Date(currentYear, 0, 1);
        }

        iterationCount++;
    }

    console.error('Failed to find next Ramadan date within reasonable iterations');
    return new Date(); // Return current date as fallback
}