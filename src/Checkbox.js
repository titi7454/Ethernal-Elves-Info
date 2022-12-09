import React from "react";
import PropTypes from "prop-types";
import './Switch.scss';

const Checkbox = ({ id, name, checked, onChange, small, disabled }) => {

  return (
    <div className={"toggle-switch" + (small ? " small-switch" : "")}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
        />
        {id ? (
          <label className="toggle-switch-label" htmlFor={id}>
            <div
              className={
                disabled
                  ? "toggle-switch-inner toggle-switch-disabled"
                  : "toggle-switch-inner"
              }
            />
            <div
              className={
              disabled
                ? "toggle-switch-switch toggle-switch-disabled"
                : "toggle-switch-switch"
              }
            />
          </label>
        ) : null}
      </div>
    );
}



Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  small: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Checkbox;