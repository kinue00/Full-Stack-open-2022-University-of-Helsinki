const Total = ({ parts }) => {
    const total = parts.reduce((previousValue, currentValue) => 
    previousValue + currentValue.exercises,0,
    )   
    return(
        <p>Total of {total} excercises</p>
    )
}

export default Total