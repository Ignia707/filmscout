// Search bar

export default function Search({ searchTerm, setSearchTerm }) {
    return (
        <div className="search">
            <div>
                <img src="search.svg"/>

                <input 
                    type="text"
                    placeholder="Dive into 1000+ movies"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                />
            </div>
        </div>
    );
}