import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './WatchesForm.css';

function WatchesForm(props) {
  const { item, validation, onChange, onSubmit } = props;

  const handleChange = (e) => {
    onChange({
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className="watches-form" onSubmit={handleSubmit}>
      <div className={classNames(['watches-form__field', { 'watches-form__invalid-field': !validation.name }])}>
        <label className="watches-form__label" htmlFor="watch-name">Название</label>
        <input
          id="watch-name"
          className="watches-form__input"
          name="name"
          type="text"
          onChange={handleChange}
          value={item.name}
        />
        <span className="watches-form__invalid-feedback">Введите город</span>
      </div>
      <div className={classNames(['watches-form__field', { 'watches-form__invalid-field': !validation.offset }])}>
        <label className="watches-form__label" htmlFor="watch-offset">Временная зона</label>
        <input
          id="watch-offset"
          className="watches-form__input"
          name="offset"
          type="number"
          onChange={handleChange}
          value={item.offset}
        />
        <span className="watches-form__invalid-feedback">Введите временную зону</span>
      </div>
      <div className="watches-form__controls">
        <button className="watches-form__input watches-form__submit" type="submit">Добавить</button>
      </div>
    </form>
  )
}

WatchesForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    offset: PropTypes.string.isRequired,
  }).isRequired,
  validation: PropTypes.shape({
    name: PropTypes.bool.isRequired,
    offset: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default WatchesForm;
