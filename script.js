document.addEventListener("DOMContentLoaded", async function () {
  const URL = "./data/travel.json";
  const data = await fetchData(URL);
  console.log(data);

  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      let searchInput = document
        .getElementById("searchInput")
        .value.trim()
        .toLowerCase();
      let results = searchKeywords(searchInput, data);
      displayResults(results);
    });

  document.getElementById("clearButton").addEventListener("click", function () {
    document.getElementById("searchInput").value = "";
    clearResults();
  });

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function searchKeywords(input, data) {
    let results = [];
    //if(input === "") return []
    for (let item in data) {
      if (item.includes(input.substring(0, input.length - 1))) {
        data[item].forEach((element) => {
          results.push(element);
        });
      }
    }

    return results;
  }

  function displayResults(results) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
    } else {
      results.forEach((result) => {
        const resultElement = document.createElement("div");

        if (!result.description) {
          result.cities.forEach((element) => {

            const nombreElemento = element.name.split(" ")[0].split(",")[0]
            const name = document.createElement("h3");
            name.textContent = element.name;
            resultsContainer.appendChild(name);

            const timeDisplay = document.createElement("h6");
            timeDisplay.className = "time-display";
            timeDisplay.id = nombreElemento;
            resultsContainer.appendChild(timeDisplay);
            showCurrentTime(nombreElemento);

            const description = document.createElement("p");
            description.textContent = element.description;
            resultsContainer.appendChild(description);

            const image = document.createElement("img");
            image.id = "imgPlace";
            image.setAttribute("src", `./images/${element.imageUrl}`);
            resultsContainer.appendChild(image);
          });
        } else {
          const name = document.createElement("h3");
          name.textContent = result.name;
          resultsContainer.appendChild(name);

          const timeDisplay = document.createElement("h6");
            timeDisplay.className = "time-display";
          timeDisplay.id = `${result.name.split(" ")[0].split(",")[0]}`;
          resultsContainer.appendChild(timeDisplay);
          showCurrentTime(result.name.split(" ")[0].split(",")[0]);

          const description = document.createElement("p");
          description.textContent = result.description;
          resultsContainer.appendChild(description);

          const image = document.createElement("img");
          image.id = "imgPlace";
          image.setAttribute("src", `./images/${result.imageUrl}`);
          resultsContainer.appendChild(image);
        }

        resultsContainer.appendChild(resultElement);
      });
    }
  }

  function clearResults() {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
  }
});

async function getTime(placeName) {
    console.log("---->> " + placeName)
    const timeZones = {
      Sydney: "Australia/Sydney",
      Melbourne: "Australia/Melbourne",
      Tokyo: "Asia/Tokyo",
      Kyoto: "Asia/Tokyo",
      "São Paulo": "America/Sao_Paulo",
      Rio: "America/Sao_Paulo",
      "Angkor Wat": "Asia/Phnom_Penh",
      "Taj Mahal": "Asia/Kolkata",
      "Bora Bora": "Pacific/Tahiti",
      Copacabana: "America/Sao_Paulo",
    };
  
    const normalizedPlaceName = placeName.toLowerCase();
  
    const matchingPlace = Object.keys(timeZones).find(place =>
      place.toLowerCase().includes(normalizedPlaceName)
    );
  
    if (matchingPlace) {
      const timeZone = timeZones[matchingPlace];
      const options = {
        timeZone: timeZone,
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const currentTime = new Date().toLocaleTimeString("en-US", options);
      console.log(`Lugar -> ${matchingPlace} -> ${currentTime}`);
      return currentTime;
    }
  
    return "Time zone not found -> " + placeName;
  }
  

function showCurrentTime(placeName) {
  async function updateTime() {
    const timeDisplay = document.getElementById(placeName);
    const currentTime = await getTime(placeName);
    timeDisplay.textContent = `Current time in ${placeName}: ${currentTime}`;
    console.log(timeDisplay.id + "- despues del inner - " + currentTime)
  }

  updateTime();
  setInterval(updateTime, 1000);
}
