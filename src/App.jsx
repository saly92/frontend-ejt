import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
const url = "http://localhost:3000/all";
function App() {
    const [siteData, setSiteData] = useState({});

    useEffect(() => {
        (async () => {
            const _siteData = (await axios.get(url)).data;
            setSiteData(_siteData);
            console.log(_siteData)
        })();
    }, []);

    //wir sollen in backend erlauben dass unsere front End darauf kommen darf before wir uberhaubt anything displaying
    //cors origin problem

    return (
        <div className="App">
            <div>Testing</div>
            {Object.keys(siteData).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div>There are {siteData.nouns.length} nouns</div>
                    <ul>
                        {siteData.nouns.map((noun, i) => {
                            return <li key={i}>{noun.singular}</li>;
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}

export default App;
