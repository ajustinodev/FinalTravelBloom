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
    for (let item in data) {
        if(item.includes(input)) {
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
        resultElement.innerHTML = `
                    <h3>${result.name}</h3>
                    <p>${result.description}</p>
                    <img src="${result.imageUrl}" alt="${result.name} image">
                `;
        resultsContainer.appendChild(resultElement);
      });
    }
  }

  function clearResults() {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
  }
});
