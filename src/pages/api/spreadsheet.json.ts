  // api.json.ts
  import type { Pemateri, ContactPerson, Kajian } from './interface';
  import type { APIRoute } from 'astro'

  const SPREADSHEET_API_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=tLpqOjya-kBrlEOsHdXo4PF5Bk2niNwMIsatRnaBFNh-v3Om_cXXCO3U1EZ3TjU-OfbWugldXz47386A38tNrjpXejShOj6jm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNKHmQjE7wNggG7YMpICnWPSoUTZetW5qcZmKGbqqloENSLf0_PfBxVj9rbQcTwzhPKi5H5hAWJ_7lSV_uMUwlQG54R8fO9Rmtz9Jw9Md8uu&lib=Mlx3rsXU4bQVNyMP6cU0E0_8Y1bAqMqQH';

  async function fetchSpreadsheetData(): Promise<{ Pemateri: Pemateri[], ContactPerson: ContactPerson[], Kajian: Kajian[] }> {
    const response = await fetch(SPREADSHEET_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  export const GET: APIRoute = async ({ params }) => {
      try {
        const data = await fetchSpreadsheetData();
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return new Response(JSON.stringify({ error: message }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    };
    