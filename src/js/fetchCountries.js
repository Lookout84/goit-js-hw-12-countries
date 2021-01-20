function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.name)
    .catch((error) => console.log(error));
}

export default fetchCountries;
