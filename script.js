document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', function() {
        let searchInput = document.getElementById('searchInput').value;
        alert('You searched for: ' + searchInput);
    });

    document.getElementById('clearButton').addEventListener('click', function() {
        document.getElementById('searchInput').value = '';
    });

    const url = "./data/travel.json";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
