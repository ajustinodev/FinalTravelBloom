document.addEventListener("DOMContentLoaded", async function () {
  const URL = "./data/travel.json";
  const data = await fetchData(URL);
  console.log(data)

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

      return data

    } catch (error) {
      console.error("Error:", error);
    }
  }

  function searchKeywords(input, data) {
    let results = [];
    console.log(input.substring(0, input.length-1))
    for (let item in data) {
        if(item.includes(input.substring(0, input.length-1))) {
            data[item].forEach(element => {
                results.push(element)
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
        console.log(result)
        const resultElement = document.createElement("div");
        resultElement.className = "result";
        resultElement.innerHTML = `<h3>${result.name}</h3>`;

        if(!result.description) {
            result.cities.forEach(element => {
                showCurrentTime(element.name.split(" ")[0].split(",")[0]);
                resultElement.innerHTML += `
                        <h5>${element.name}</h5>
                        <p>${element.description}</p>
                        <img src="./images/${element.imageUrl}" alt="${element.name} image" id="imgPlace">
                    `;
            });
        } else {
            showCurrentTime(result.name.split(" ")[0].split(",")[0]);
            resultElement.innerHTML += `
                    <p>${result.description}</p>
                    <img src="./images/${result.imageUrl}" alt="${result.name} image" id="imgPlace">
                `;
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
    const timeZones = {
        "Sydney": "Australia/Sydney",
        "Melbourne": "Australia/Melbourne",
        "Tokyo": "Asia/Tokyo",
        "Kyoto": "Asia/Tokyo",
        "São Paulo": "America/Sao_Paulo",
        "Angkor Wat": "Asia/Phnom_Penh",
        "Taj Mahal": "Asia/Kolkata",
        "Bora Bora": "Pacific/Tahiti",
        "Copacabana": "America/Sao_Paulo"
    };

    for (let place in timeZones) {
        console.log("Lugar -> " + place + " incluye -> " + placeName + "???")
        if (place.toLowerCase().includes(placeName.toLowerCase())) {
            const timeZone = timeZones[place];
            try {
                const targetUrl = `https://timeapi.io/api/Time/current/zone?timeZone=${timeZone}`;
                const response = await fetch(targetUrl);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching time data:", error);
                return "Error fetching time data";
            }
        }
    }
    return "Time zone not found";
}

function showCurrentTime(placeName) {
    const timeDisplay = document.createElement("h6");
    timeDisplay.className = "time-display"

    async function updateTime() {
        const currentTime = await getTime(placeName);
        timeDisplay.textContent = currentTime;
        console.log(currentTime)
    }

    updateTime();
    // setInterval(updateTime, 1000);
}


