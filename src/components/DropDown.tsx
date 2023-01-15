import { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const DropDown = () => {
  const [dropdownOpen, setDropDownOpen] = useState<boolean>();
  const [dropdownValue, setDropDownValue] = useState<string>('Filter');

  const toggle = () => {
    setDropDownOpen((prev) => !dropdownOpen);
  };

  const handleChangeValue = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.textContent)
      setDropDownValue(e.currentTarget.textContent);
  };
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className="select-filter-display">
        {dropdownValue}
      </DropdownToggle>
      <DropdownItem divider />
      <DropdownMenu>
        <DropdownItem>
          <div onClick={handleChangeValue}>Invoice Number</div>
        </DropdownItem>
        <DropdownItem>
          <div onClick={handleChangeValue}>Bank Name</div>
        </DropdownItem>
        <DropdownItem>
          <div onClick={handleChangeValue}>IFSC Code</div>
        </DropdownItem>
        <DropdownItem>
          <div onClick={handleChangeValue}>Account Number</div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
