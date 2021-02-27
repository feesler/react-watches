import React from 'react';
import PropTypes from 'prop-types';
import Watch from '../Watch/Watch.jsx';
import './WatchesList.css';

function WatchesList(props) {
  const { items, onRemove } = props;

  const handleRemove = (watchId) => {
    onRemove(watchId);
  }

  return (
    <div className="watches-list">
      {items.map((item) => <Watch key={item.id} {...item} onRemove={handleRemove} />)}
    </div>
  )
}

WatchesList.propTypes = {

};

export default WatchesList

