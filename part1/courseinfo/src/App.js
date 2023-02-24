// const course = 'Half Stack application development'
// const part1 = 'Fundamentals of React'
// const exercises1 = 10
// const part2 = 'Using props to pass data'
// const exercises2 = 7
// const part3 = 'State of a component'
// const exercises3 = 14

const Header = (props) => {
  console.log(props)
  return (
      <h1>{props.course.name}</h1>
  )
}

// const Part = (props) => {
//   return (
//       <p>
//         {props.parts}
//       </p>
//   )
// }

const Content = (props) => {
  // console.log(props)
  let t = []
  props.course.parts.forEach(part => {
    console.log(part.name) 
    t.push(part.name + ' ' + part.exercises)
  })
    t = t.map(name => <p>{name}</p>)
    console.log(t)
  return (
    <div> 
      {t}
    </div>
    )
}

const Total = (props) => {
  let i = 0
  props.course.parts.forEach(part => {
    // console.log(part)
    i += part.exercises
  });
  return (
      <p>Total number of exercises {i}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App;
