import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { country } from "casual-browserify";

SelectCountry.propTypes = {
  listCountries: PropTypes.array,
  options: PropTypes.array,
};
SelectCountry.defaultProps = {
  listCountries: [],
  options: [],
};
function SelectCountry(props) {
  const { options, onChange } = props;
  return (
    <div>
      <Select name="country" options={options} onChange={onChange} />
    </div>
  );
}

export default SelectCountry;
