import React from 'react';
import Select from 'react-select';

const DropDown = ({ options, onSelect, defaultOption }) => {

/* ~*~*~*~*~*~ map over the options array to make new object array of value and label ~*~*~*~*~*~ */

  const selectOptions = options.map((option) => ({
    value: option,
    label: option
  }));

/* ~*~*~*~*~*~ if selected option then it's value assigned otherwise empty, name category value option with onSelect ~*~*~*~*~*~ */

  const handleSelect = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    onSelect(value);
  };

/* ~*~*~*~*~*~ styling the react-select drop down (as much as can) ~*~*~*~*~*~ */

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      color: '#ffffffef', 
      backgroundColor: '#6c7394',
      border: 'var(--green)'
    }),
    singleValue:(provided, state) =>({
      color: '#ffffffef', 
    }),
    option: (provided, state) => ({
      ...provided,
      color: '#ffffffef', 
      backgroundColor: '#838aac',
      fontWeight: state.isSelected ? "bold" : "normal",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#ffffffef', 
    }),
    menu: (provided, state) => ({
      ...provided,
      color: '#ffffffef',
    }),
    text: (provided, state) =>({
    ...provided,
    color: '#ffffffef'
    })
  };

/* ~*~*~*~*~*~ render the drop down component with bits 'n' bobs~*~*~*~*~*~ */

  return (
    <Select
      options={[...selectOptions]}
      onChange={handleSelect}
      defaultValue={null}
      className="drop-down" 
      classNamePrefix="custom-select" 
      styles={customStyles}    />      
  );
};

export default DropDown;


