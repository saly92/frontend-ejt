import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
const url = "http://localhost:3000/all";
function App() {
    // const [siteData, setSiteData] = useState({});
    //search items:
    /*[{
  kind:"noun",
  bulkSearch:"Nutiz",
  item:{
    'article':'die',
    'singular':'Notiz',
    'plural':'die Notizen',
  },
}]*/
    const [searchItems, setSearchItems] = useState([]);
    const [filteredSearchItems, setFilteredSearchItems] = useState([]);
 

    useEffect(() => {
        (async () => {
            const _siteData = (await axios.get(url)).data;
            // setSiteData(_siteData);
            // console.log(_siteData)
            const _searchItems = [];
            _siteData.nouns.forEach((item) => {
                _searchItems.push({
                    kind: "noun",
                    bulkSearch: item.singular,
                    item,
                });
            });
            setSearchItems(_searchItems);
            setFilteredSearchItems([])
        })();
    }, []);
    const handleSearch = (e) => {
        const searchText = e.target.value;
        if(searchText === ''){setFilteredSearchItems([]);}else{const _filteredSearchItems = searchItems.filter((m) =>
            m.bulkSearch.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredSearchItems(_filteredSearchItems); }
        
    };
    //wir sollen in backend erlauben dass unsere front End darauf kommen darf before wir uberhaubt anything displaying
    //cors origin problem

    return (
        <div className="App">
            <div>Testing</div>
            {Object.keys(searchItems).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <>
                    {/* <div>There are {searchItems.length} items</div> */}
                    <input
                        type="text"
                        autoFocus
                        onChange={(e) => handleSearch(e)}
                    />
                    <ul>
                        {filteredSearchItems.map((item, i) => {
                            return <li key={i}>{item.kind} {item.item.singular} </li>;
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}

export default App;
