import React, { useState, useEffect } from 'react';

const DeliveredButton = ({ route, checkpointData }) => {
  const checkpointIds = checkpointData.map((checkpoint) => checkpoint.id);

  const [checkpointIndex, setCheckpointIndex] = useState(0);
  const [completedCheckpoints, setCompletedCheckpoints] = useState([]);

  const markCheckpointAsComplete = async (id) => {
    const response = await fetch(`http://localhost:8080/checkpoints/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("")
    });

    const getData = await response.json();
    setCompletedCheckpoints(getData);
  };

  useEffect(() => {
    // Add any additional logic you want to run after completing the PATCH request
  }, [completedCheckpoints]);

  const handleButtonClick = () => {
    const currentCheckpointId = checkpointIds[checkpointIndex + 1];
    markCheckpointAsComplete(currentCheckpointId);
    setCheckpointIndex((prevIndex) => prevIndex + 1);
  };

  console.log(checkpointIndex);

  return (
    <section className="delivered-btn-container">
      <button onClick={handleButtonClick}>Delivered</button>
    </section>
  );
};

export default DeliveredButton;
