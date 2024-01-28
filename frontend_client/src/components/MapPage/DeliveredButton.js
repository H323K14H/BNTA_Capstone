import React, { useState, useEffect } from 'react';

const DeliveredButton = ({ route, checkpointData, markCheckpointAsComplete }) => {


  const [checkpointIndex, setCheckpointIndex] = useState(
    route.upcomingCheckpointIndex ? route.upcomingCheckpointIndex : 0
  );


  const checkpointIds = checkpointData.map((checkpoint) => checkpoint.id);


  const handleButtonClick = () => {

    const currentCheckpointId = checkpointIds[checkpointIndex];

    markCheckpointAsComplete(currentCheckpointId);
    setCheckpointIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (route) {
      setCheckpointIndex(route.upcomingCheckpointIndex)
    }
  }, [route])

  
  return (
    <section className="delivered-btn-container">
      {checkpointIndex < checkpointIds.length ?
        <button className="btn-default" onClick={handleButtonClick}>
          {checkpointIndex === 0 ? "Collected" : "Delivered"}
        </button>
        :
        null
      }
    </section>
  );
};

export default DeliveredButton;