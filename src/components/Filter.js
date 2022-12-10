import React, { useState, useEffect } from "react";
import styles from "../styles/projectDetails.module.css";
import Select from "react-select";
import {
  labelOptions,
  multiInputStyles,
  singleInputStyle,
} from "../utils/constants";

function Filter({ issues, filteredIssues, setFilteredIssues }) {
  // Defining the states containing the selected filters value
  const [authorOptionState, setAuthorOptionState] = useState();
  const [labelOptionsState, setLabelOptionsState] = useState([]);

  // Defining the states to set which filter is on/off
  const [isLabelFilter, setIsLabelFilter] = useState(false);
  const [isAuthorFilter, setIsAuthorFilter] = useState(false);

  let handleLabelsChange;
  let handleAuthorChange;

  useEffect(() => {
    if (!isLabelFilter) {
      if (!isAuthorFilter) {
        // if label filter is off and author filter is off
        // set issues in filteredIssues state to set the filteredIssues state according to the label filter
        setFilteredIssues(issues);
      } else {
        // if label filter is off and author filter is on
        // call handleAuthorChange function to set the filteredIssues state according to the author filter
        handleAuthorChange(authorOptionState);
      }
    }

    if (!isAuthorFilter) {
      if (!isLabelFilter) {
        // if author filter is off and label filter is off
        // set issues in filteredIssues state
        setFilteredIssues(issues);
      } else {
        // if author filter is off and label filter is on
        // call handleLabelsChange function
        handleLabelsChange(labelOptionsState);
      }
    }
  }, [
    isLabelFilter,
    isAuthorFilter,
    setFilteredIssues,
    issues,
    handleAuthorChange,
    authorOptionState,
    handleLabelsChange,
    labelOptionsState,
  ]);

  //  <----------- Search Filter ----------------->

  // Function called on every search
  const handleSearchFilter = (e) => {
    // Get the search word
    const searchWord = e.target.value;
    // Search the word in every issue title and description
    const newSearchFilter = issues.filter((issue) => {
      return (
        issue.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    // set the returned issues array after search as filtered issues
    setFilteredIssues(newSearchFilter);
  };

  // function to return an array of issues containing the selected filter options
  const filterByLabelsArray = (searchIssues, selectedOptionsArr) => {
    let labelFilteredIssues = [];

    // In every issue, search for every option selected in the filters input
    for (let issue of searchIssues) {
      for (let option of selectedOptionsArr) {
        if (issue.labels.includes(option)) {
          if (!labelFilteredIssues.includes(issue)) {
            // if the option is found in the issue then add that issue in the labelFilteredIssues array if not already present
            labelFilteredIssues.push(issue);
          }
        } else {
          // if any option is not found in the issue then remove that issue from the labelFilteredIssues array if its present
          let index = labelFilteredIssues.indexOf(issue);
          if (index !== -1) {
            labelFilteredIssues.splice(index, index + 1);
          }
          break;
        }
      }
    }
    return labelFilteredIssues;
  };

  //  <----------- Labels Filter ----------------->
  let labelFilteredIssues = [];
  // Function called when any label is selected in the label filter
  handleLabelsChange = (selectedOptions) => {
    // set isLabelFilter selected as true
    setIsLabelFilter(true);
    // set filtered arary state as empty
    setFilteredIssues([]);
    // set the selected filter options in label Options state
    setLabelOptionsState(selectedOptions);
    // get the values of the selected options in the filter
    let selectedOptionsArr = selectedOptions.map((option) => {
      return option.value;
    });
    // If no value is selected in labels filter
    if (selectedOptionsArr.length === 0) {
      // set isLabelFilter selected as false
      setIsLabelFilter(false);
    }
    let searchIssues = [];
    // check if author filter is on/off and set the value of search issues
    if (!isAuthorFilter) {
      searchIssues = issues;
    } else {
      searchIssues = filteredIssues;
    }

    // get the issue array from filterByLabelsArray function
    const labelFilteredIssues = filterByLabelsArray(
      searchIssues,
      selectedOptionsArr
    );
    // set the labelFilteredIssues as filtered issues
    setFilteredIssues(labelFilteredIssues);
  };

  //  <----------- Author Filter ----------------->

  // get all the authors of the issues in the project
  let authors = issues.map((issue) => issue.author);
  // to remove duplicate authors
  authors = [...new Set(authors)];

  // create an authorOptions object to pass in the react-select component
  const authorOptions = authors.map((author) => {
    let optionObject = { value: author, label: author };
    return optionObject;
  });

  // Function called when any author is selected in the author filter
  handleAuthorChange = (selectedOption) => {
    // set isLabelFilter selected as true
    setIsAuthorFilter(true);
    // set filtered arary state as empty
    setFilteredIssues([]);
    // If no value is selected in authors filter
    if (selectedOption === null) {
      // set isAuthorFilter selected as false
      setIsAuthorFilter(false);
    } else {
      // set the selected filter option in author Option state
      setAuthorOptionState(selectedOption);

      let searchIssues = [];
      // check if label filter is on/off and set the value of search issues
      if (!isLabelFilter) {
        searchIssues = issues;
      } else {
        let labelOptionsArr = labelOptionsState.map((option) => {
          return option.value;
        });

        // get the issue array from filterByLabelsArray function
        const labelFilteredIssues = filterByLabelsArray(
          issues,
          labelOptionsArr
        );

        // set the labelFilteredIssues as search issues
        searchIssues = labelFilteredIssues;
      }

      // search for author in the search issues array
      for (let issue of searchIssues) {
        if (issue.author === selectedOption.value) {
          if (!labelFilteredIssues.includes(issue)) {
            labelFilteredIssues.push(issue);
            // set the labelFilteredIssues in filteredIssues state
            setFilteredIssues(labelFilteredIssues);
          }
        }
      }
    }
  };

  return (
    // Filters container
    <div className={styles.filtersContainer}>
      {/* Search Filter */}
      <div className={styles.searchFilterContainer}>
        <div className={styles.searchInputs}>
          <p> Search by Titile/Description </p>
          <input
            type="text"
            onChange={handleSearchFilter}
            placeholder={"Titile/Description"}
          />
        </div>
      </div>

      {/* Labels Filter */}
      <div className={styles.labelFilterContainer}>
        <p> Labels </p>
        <Select
          options={labelOptions}
          isMulti
          closeMenuOnSelect={true}
          hideSelectedOptions={true}
          name="labels"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleLabelsChange}
          styles={multiInputStyles}
        />
      </div>

      {/* Author Filter */}
      <div className={styles.authorFilterContainer}>
        <p> Author </p>
        <Select
          options={authorOptions}
          closeMenuOnSelect={true}
          hideSelectedOptions={true}
          name="labels"
          isClearable={true}
          className="basic-single"
          classNamePrefix="select"
          onChange={handleAuthorChange}
          isRtl={false}
          isSearchable={true}
          styles={singleInputStyle}
        />
      </div>
    </div>
  );
}

export default Filter;
