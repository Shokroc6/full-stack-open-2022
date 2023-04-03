
const Persons = ({persons, filterWord, toggleImportanceOf}) => {
    const personsToShow = filterWord.length === 0 ? 
            persons : 
            persons.filter(value => value.name.includes(filterWord))  

    return (
    <ul>
        {personsToShow.map((value) => 
            <li key={value.id}>
                {value.name} {value.number}
                <button onClick={() => toggleImportanceOf(value.id)}>delete</button>
            </li>)
        }
    </ul>
    )
}
export default Persons