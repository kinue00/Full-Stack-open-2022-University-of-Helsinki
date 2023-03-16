import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) =>{
    return(
    <div>
        <Header key={course.id} course={course} />
        <Content key={course.parts.id} parts={course.parts} />
        <Total key={course.parts.id} parts={course.parts} />
    </div>
    )
}

export default Course