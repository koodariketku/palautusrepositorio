const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


const Part = (props) => {
  return(
    <p>{props.sisalto.name} {props.sisalto.exercises}</p>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part sisalto={props.sisalto[0]}/>
      <Part sisalto={props.sisalto[1]}/>
      <Part sisalto={props.sisalto[2]}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>
        Number of exercises {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}
      </p>
    </div>
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
      <Header course={course.name}/>
      <Content sisalto={course.parts}/>
      <Total exercises={course.parts}/>
    </div>
  )
}

export default App