const Counter = ({completedCheckpoints, route}) => {

    return (
        <section className="counter">

            {
                (route&&route.checkpoints&&completedCheckpoints)?
                <b>Delivery: {completedCheckpoints.length}/{route.checkpoints.length}</b>
                : null

            }
        </section>
    );
}

export default Counter;