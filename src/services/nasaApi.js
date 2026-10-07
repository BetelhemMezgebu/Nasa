const APOD_URL =
  "https://science.nasa.gov/wp-json/wp/v2/apod-basic";


// =========================
// NASA APOD
// =========================

export async function getAPOD(date = "") {
  const url = `${APOD_URL}?per_page=100`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch NASA APOD data.");
  }

  const data = await response.json();

  if (!data.length) {
    throw new Error("No APOD data found.");
  }

  // If a date was selected
  if (date) {
    const selectedAPOD = data.find((item) => {
      const itemDate =
        item.date?.split("T")[0];

      return itemDate === date;
    });

    if (!selectedAPOD) {
      throw new Error(
        `No APOD found for ${date}.`
      );
    }

    return [selectedAPOD];
  }

  // Default: latest APOD
  return [data[0]];
}


// =========================
// NASA MARS ROVER / IMAGE LIBRARY
// =========================

export async function getMarsRoverPhotos(
  rover = "curiosity"
) {
  const roverQueries = {
    curiosity: "Curiosity Mars rover",
    opportunity: "Opportunity Mars rover",
    spirit: "Spirit Mars rover",
  };

  const query =
    roverQueries[rover] ||
    roverQueries.curiosity;

  const url =
    `https://images-api.nasa.gov/search` +
    `?q=${encodeURIComponent(query)}` +
    `&media_type=image` +
    `&page=1` +
    `&page_size=100`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch NASA Mars Rover images."
    );
  }

  const data = await response.json();

  const items =
    data.collection?.items || [];

  return items
    .map((item) => {
      const metadata =
        item.data?.[0] || {};

      const imageLink =
        item.links?.find(
          (link) =>
            link.render === "image"
        );

      const imageUrl =
        imageLink?.href || "";

      return {
        id:
          metadata.nasa_id ||
          `${rover}-${Date.now()}-${Math.random()}`,

        title:
          metadata.title ||
          "Mars Rover Photo",

        description:
          metadata.description ||
          "",

        date:
          metadata.date_created ||
          "",

        earth_date:
          metadata.date_created ||
          "",

        img_src: imageUrl,

        url: imageUrl,

        rover: {
          name:
            rover.charAt(0).toUpperCase() +
            rover.slice(1),
        },

        camera: {
          name:
            metadata.center ||
            "NASA",

          full_name:
            metadata.center ||
            "NASA Image Library",
        },
      };
    })
    .filter(
      (photo) => photo.img_src
    );
}