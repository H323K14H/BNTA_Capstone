import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const DeliveredButton = ({ route }) => {

  const [completedCheckpoints, setCompletedCheckpoints] = useState([])

  const markCheckpointAsComplete = async (id) => {

    const response = await fetch(`http://localhost:8080/checkpoints/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify("")
      }
    )
    const getData = await response.json()
    setCompletedCheckpoints(getData);
  }

  useEffect(() => {}, [completedCheckpoints])

  return (
    <section className="delivered-btn-container">
      <button onClick={markCheckpointAsComplete(1)}>Delivered</button>
    </section>
  )
}

export default DeliveredButton