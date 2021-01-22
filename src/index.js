import css from "./css/styles.css";
import fetchCountries from "./js/fetchCountries.js";
import refs from "./js/refs.js";
import template from "./templates/template.hbs";
import templ from "./templates/templ.hbs";
import {debounce as _debounce} from 'lodash/fp';

refs.formInput.addEventListener("input", _debounce(getInputValue, 500));

function getInputValue(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const inputValue = form.elements.query.value;
  console.log(inputValue);
  refs.ulCountries.innerHTML = "";
  fetchCountries(inputValue)
    .then(updateUlCountries)
    .catch((error) => console.log(error));
}

function updateUlCountries(name) {
  const markup = template(name);
  refs.ulCountries.insertAdjacentHTML("beforeend", markup);
}

// fetch("https://restcountries.eu/rest/v2/name/italy")
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//     const mark = template(data);
//     console.log(mark);
//   });
