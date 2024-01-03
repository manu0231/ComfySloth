import React from 'react'

const FormRow = ({ type, name, value, handleChange, children }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      {type === 'select' ? (
        <select
          value={value}
          name={name}
          onChange={handleChange}
          className="form-input"
        >
          {children}
        </select>
      ) : type === 'checkbox' ? (
        <input
          type="checkbox"
          checked={value}
          name={name}
          onChange={handleChange}
          className="form-checkbox"
        />
      ) : (
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className="form-input"
        />
      )}
    </div>
  )
}

export default FormRow
