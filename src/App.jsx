import "./App.scss";
import { Noun } from "./components/Noun";
import {Book} from "./components/Book";
import { TechPerson } from "./components/TechPerson";
import { Setting } from "./components/Setting";
import { Employee } from "./components/Employee";
import { Translation } from "./components/Translation";
import { Job } from "./components/Job";
import { LandscapePhoto } from "./components/LandscapePhoto";

import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://localhost:3007";
const url = `${baseUrl}/all`;


const separator = "|";
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

            _siteData.books.forEach((item) => {
                _searchItems.push({
                    kind: "book",
                    bulkSearch: item.title + separator + item.description,
                    item,
                });
            });
            _siteData.techPersons.forEach((item) => {
                _searchItems.push({
                    kind: "techPerson",
                    bulkSearch:
                        item.fullName +
                        separator +
                        item.quickInfo +
                        separator +
                        item.body,
                    item,
                });
            });
            
            _siteData.employees.forEach((item) => {
                _searchItems.push({
                    kind: "employee",
                    bulkSearch: item.FIRST_NAME + separator + item.LAST_NAME,
                    item,
                });
            });
_siteData.translations.forEach((item) => {
    _searchItems.push({
        kind: "translation",
        bulkSearch:
            item.fromLanguage +
            separator +
            item.toLanguage +
            separator +
            item.fromPhrase +
            separator +
            item.toPhrase,
        item,
    });
});

_siteData.jobs.forEach((item) => {
    _searchItems.push({
        kind: "job",
        bulkSearch: item.html,
        item,
    });
});
_siteData.landscapePhotos.forEach((item) => {
    _searchItems.push({
        kind: "landscapePhoto",
        bulkSearch: item,
        item,
    });
});

            setSearchItems(_searchItems);
            setFilteredSearchItems([]);
        })();
    }, []);
    const handleSearch = (e) => {
        const searchText = e.target.value.trim();
		let _filteredSearchItems = [];
		if (searchText.length >= 3) {
			_filteredSearchItems = searchItems.filter((m) =>
				m.bulkSearch.toLowerCase().includes(searchText.toLowerCase())
			);
			setFilteredSearchItems(_filteredSearchItems);
		}
		if (searchText === '') {
			_filteredSearchItems = [];
			setFilteredSearchItems(_filteredSearchItems);
		}
    };
    //wir sollen in backend erlauben dass unsere front End darauf kommen darf before wir uberhaubt anything displaying
    //cors origin problem

    return (
        <div className="App">
            <div>Search Info</div>
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

                    <div className="searchItems">
                        {filteredSearchItems.map((item, i) => {
                            return (
                                <>
                                    {item.kind === "noun" && (
                                        <Noun item={item.item} />
                                    )}
                                    {item.kind === "book" && (
                                        <Book item={item.item} />
                                    )}
                                    {item.kind === "techPerson" && (
                                        <TechPerson item={item.item} />
                                    )}
                                    {item.kind === "setting" && (
                                        <Setting item={item.item} />
                                    )}
                                    {item.kind === "employee" && (
                                        <Employee item={item.item} />
                                    )}
                                    {item.kind === "translation" && (
                                        <Translation item={item.item} />
                                    )}
                                    {item.kind === "job" && (
                                        <Job item={item.item} />
                                    )}
                                    {item.kind === "landscapePhoto" && (
                                        <LandscapePhoto
                                            item={item.item}
                                            baseUrl={baseUrl}
                                        />
                                    )}
                                </>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
