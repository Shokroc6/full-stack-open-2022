
const Filter = ({filterWord, setFilterWord}) => {


    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilterWord(event.target.value)
        console.log(filterWord);
    }

    return (
        <div>
            filter shown with 
            <input 
                value={filterWord}
                onChange={handleFilterChange}
            />
        </div>
    )
}
export default Filter