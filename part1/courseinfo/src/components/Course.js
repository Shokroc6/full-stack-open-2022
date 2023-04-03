const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ parts }) => {

    const total = parts.reduce((s, p) => s + p.exercises, 0)

    return (
        <h3>total of {total} exercises </h3>
    )
}

const Content = ({ parts }) => 
    <ul>
        {parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
    </ul>

const Course = ({course}) => {
    const {name, parts} = course
    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course