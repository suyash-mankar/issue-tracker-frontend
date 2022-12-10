// Label Options for Input of react-select
export const labelOptions = [
  { value: "bug", label: "bug" },
  { value: "documentation", label: "documentation" },
  { value: "duplicate", label: "duplicate" },
  { value: "enhancement", label: "enhancement" },
  { value: "invalid", label: "invalid" },
];

// styles for multiInput from react-select
export const multiInputStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
    background: "black",
  }),
  option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
    ...provided,
    color: "black",
    border: "1px solid #dadada",
  }),
  multiValue: (provided) => ({
    ...provided,
    background: "white",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    border: "none",
    borderRadius: "0 2px 2px 0",
    backgroundColor: "#F76F72",
    ":hover": {
      backgroundColor: "red",
      color: "white",
    },
  }),
};

// styles for singleInput from react-select
export const singleInputStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
    background: "black",
  }),
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
};
