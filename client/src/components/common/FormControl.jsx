import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const FormControl = ({
    name,
    type = "text",
    value = "",
    onChange = (new Function()),
    info = "",
    error = "",
    value = "",
    disabled = flase,
    placeholder = ""
}) => (
    <div className="form-group">
    <input
      type={type}
      className={classnames("form-control form-control-lg", {
        "is-invalid": error
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {error && (
      <div className="invalid-feedback">{error}</div>
    )}
    {info && (
      <div className="form-text text-muted">{info}</div>
    )}
    </div>
);

FormControl.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func,
    info: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.boolean,
    placeholder: PropTypes.string 
};

export default FormControl;
