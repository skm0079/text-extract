import { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const DropDown = () => {
  const [dropdownOpen, setDropDownOpen] = useState<boolean>();

  const toggle = () => {
    setDropDownOpen((prev) => !dropdownOpen);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>Filter</DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Invoice Number</DropdownItem>
        <DropdownItem>Bank Name</DropdownItem>
        <DropdownItem>IFSC Code</DropdownItem>
        {/* <DropdownItem divider /> */}
        <DropdownItem>Acoount Number</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
