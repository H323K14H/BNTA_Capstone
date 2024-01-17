import React, { useState, useEffect } from 'react';

const DeliveredButton = ({ route, checkpointData, markCheckpointAsComplete, getRouteById}) => {

  const [checkpointIndex, setCheckpointIndex] = useState(0);

  const checkpointIds = checkpointData.map((checkpoint) => checkpoint.id);

  const handleButtonClick = () => {
    const currentCheckpointId = checkpointIds[checkpointIndex];
    markCheckpointAsComplete(currentCheckpointId);
    setCheckpointIndex((prevIndex) => prevIndex + 1);
    getRouteById(1);
  };

  console.log(checkpointIndex);

  return (
    <section className="delivered-btn-container">
      <button onClick={handleButtonClick}>{checkpointIndex==0?"Collected":"Delivered"}</button>
    </section>
  );
};

export default DeliveredButton;
