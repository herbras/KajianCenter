// locationService.js
export async function getLocality(latitude, longitude) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    if (!response.ok) {
      throw new Error('Failed to retrieve location details.');
    }
    const data = await response.json();


    const { county, city } = data.address;
    const location = county || city;

    return { location };
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw error;
  }
}
