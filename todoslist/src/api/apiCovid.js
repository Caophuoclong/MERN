import axiosClient from "./axiosClient";

export default {
  getCountries: () => {
    const url = "/countries";
    return axiosClient.get(url);
  },
  getConfirmed: (country) => {
    const url = `/live/country/${country}/status/confirmed`;
    return axiosClient.get(url);
  },
};
