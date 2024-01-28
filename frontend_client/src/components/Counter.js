const Counter = ({ completedCheckpoints, route }) => {

    return (
        <>
            {
                (route && route.checkpoints && completedCheckpoints) ?
                    <section className="counter">
                        <b>Delivery {completedCheckpoints.length}/{route.checkpoints.length}</b>
                    </section>
                    : null

            }
        </>
    );
}

export default Counter;