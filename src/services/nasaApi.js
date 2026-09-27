const APOD_URL = "https://science.nasa.gov/wp-json/wp/v2/apod-basic";

export async function getAPOD(date = "") {
  let url = `${APOD_URL}?per_page=100`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch NASA APOD data.");
  }

  const data = await response.json();

  if (!data.length) {
    throw new Error("No APOD data found.");
  }

  // If a date was selected, find that exact APOD
  if (date) {
    const selectedAPOD = data.find((item) => {
      const itemDate = item.date?.split("T")[0];
      return itemDate === date;
    });

    if (!selectedAPOD) {
      throw new Error(`No APOD found for ${date}.`);
    }

    return [selectedAPOD];
  }

  // Default: latest APOD
  return [data[0]];
}