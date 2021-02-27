import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WatchesForm from '../WatchesForm/WatchesForm.jsx';
import WatchesList from '../WatchesList/WatchesList.jsx';
import { nanoid } from 'nanoid';

const initialItem = {
  name: '',
  offset: '',
};
const initialValidation = {
  name: true,
  offset: true,
};

const initialState = {
  currentItem: initialItem,
  validation: initialValidation,
  watches: [],
};

function Watches() {
  const [state, setState] = useState(initialState);

  const handleChange = (change) => {
    setState((prev) => ({
      ...prev,
      currentItem: { ...prev.currentItem, ...change },
      validation: initialValidation,
    }))
  };

  const handleAdd = () => {
    if (!state.currentItem.name.length) {
      setState((prev) => ({
        ...prev,
        validation: { ...prev.validation, name: false },
      }));
      return;
    }

    if (!state.currentItem.offset.length) {
      setState((prev) => ({
        ...prev,
        validation: { ...prev.validation, offset: false },
      }));
      return;
    }

    const newItem = {
      id: nanoid(),
      ...state.currentItem,
    };

    setState((prev) => ({
      ...prev,
      currentItem: initialItem,
      validation: initialValidation,
      watches: [...prev.watches, newItem],
    }));
  }

  const handleRemove = (watchId) => {
    setState((prev) => ({
      ...prev,
      watches: [...prev.watches.filter((item) => item.id !== watchId)],
    }));
  }

  return (
    <div>
      <WatchesForm
        item={state.currentItem}
        validation={state.validation}
        onChange={handleChange}
        onSubmit={handleAdd}
      />
      <WatchesList items={state.watches} onRemove={handleRemove} />
    </div>
  )
}

Watches.propTypes = {
};

export default Watches;
