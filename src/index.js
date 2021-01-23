import css from "./css/styles.css";
import fetchCountries from "./js/fetchCountries.js";
import refs from "./js/refs.js";
import oneCountry from "./templates/template.hbs";
import manyCountries from "./templates/templ.hbs";
import "@pnotify/core/dist/PNotify.css";

import { error } from "@pnotify/core";
import debounce from "lodash.debounce";

refs.formInput.addEventListener("input", debounce(getInputValue, 500));

function getInputValue(event) {
  event.preventDefault();
  refs.ulCountries.innerHTML = "";
  const inputValue = event.target.value;
  if(!inputValue) {
    return
  }

  fetchCountries(inputValue)
    .then((data) => {
      if (data.length > 10) {
        error({
          text: "Too many matches found. Please enter a more specific query!",
        });
      } else if (data.status === 404) {
        error({
          text:
            "No country has been found. Please enter a more specific query!",
        });
      } else if (data.length === 1) {
        updateUlCountries(data, oneCountry);
      } else if (data.length <= 10) {
        updateUlCountries(data, manyCountries);
      }
    })
    .catch((Error) => {
      Error({ text: "You must enter query parameters!" });
      console.log(Error);
    });
}

function updateUlCountries(name, template) {
  const markup = template(name);
  refs.ulCountries.insertAdjacentHTML("beforeend", markup);
}
