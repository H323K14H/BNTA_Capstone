import React, { useState, useEffect } from 'react';

const DeliveredButton = ({ route, checkpointData, markCheckpointAsComplete, getRouteById }) => {

  const [checkpointIndex, setCheckpointIndex] = useState(
    route.upcomingCheckpointIndex ? route.upcomingCheckpointIndex : 0
  );

  const checkpointIds = checkpointData.map((checkpoint) => checkpoint.id);

  const handleButtonClick = () => {
    const currentCheckpointId = checkpointIds[checkpointIndex];
    markCheckpointAsComplete(currentCheckpointId);
    setCheckpointIndex((prevIndex) => prevIndex + 1);
    // localStorage.setItem("checkpointIndex", parseInt(localStorage.getItem("checkpointIndex"))+1)
    // getRouteById(1);
  };

  useEffect(() => {
    if (route) {
      setCheckpointIndex(route.upcomingCheckpointIndex)
    }
  }, [route])

  console.log(checkpointIds);

  console.log(checkpointIndex);

  return (
    <section className="delivered-btn-container">
      {checkpointIndex < checkpointIds.length ?
        <button onClick={handleButtonClick}>
          {checkpointIndex === 0 ? "Collected" : "Delivered"}
        </button>
        :
        <strong>Deliveries complete!</strong>
      }
    </section>
  );
};

export default DeliveredButton;