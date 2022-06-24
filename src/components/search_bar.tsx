
const SearchBar = ({ onSearchTermChange }:{onSearchTermChange:Function}) => {
  const onInputChange = (term: string) => onSearchTermChange({ term });
  return (
    <div className='search-bar order-lg-1'>
      <input onChange={(event) => onInputChange(event.target.value)} />
    </div>
  );
};

export default SearchBar;
