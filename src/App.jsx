import { useState } from 'react'
import './App.css'
import Banned from './components/Bans'

function App() {
  const url = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&origin_country_codes=~US`;
  const api_key = "live_M743AiIILHT0qJGygaX21d4oCRyLpckchx3LJzrZIVyBsJuXQLuwA27qyALJqp4o";
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [src, setSrc] = useState("");
  const [banList, setBanList] = useState([]);
  const [urlBans, setUrlBans] = useState([]);
  const [data, setData] = useState({});

  const getCat = async () => {
    console.log("Buddy has been");
    try {
      let s = "";
      urlBans.forEach((item) => {
        s += item;
      });

      const response = await fetch(url + s, {
        headers: {
          'x-api-key': api_key,
        },
      });

      const data = await response.json();
      setData(data);
      setName(data[0].breeds[0].name);
      setCategories([
        data[0].breeds[0].weight.imperial,
        data[0].breeds[0].origin,
        data[0].breeds[0].life_span,
      ]);
      setSrc(data[0].url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBan = (toBan, n) => {
    setBanList([...banList, toBan]);
    let updatedUrl = urlBans.slice(); // Create a copy of urlBans
  
    if (n === 0) {
      updatedUrl.push("&weight_imperial=~" + data[0].breeds[0].weight.imperial);
    } else if (n === 1) {
      updatedUrl.push("&origin_country_codes=~" + data[0].breeds[0].country_code);
    } else if (n === 2) {
      updatedUrl.push("&life_span=~" + data[0].breeds[0].life_span);
    }
  
    setUrlBans(updatedUrl);
  };
  
  const handleUnban = (toUnban) => {
    setBanList(banList.filter((item) => item !== toUnban));
    // Remove the banned attribute from the urlBans array
    setUrlBans(urlBans.filter((url) => !url.includes(toUnban)));
  };
  

  return (
    <div className="Main">
      <div className="left-side">
        <h1>Adopt Me</h1>
        <h2>Discover your ideal buddy!</h2>
        <div>
          <button onClick={() => handleBan(categories[1], 1)}>Origin: {categories[1]}</button>
          <button onClick={() => handleBan(categories[2], 2)}>Lifespan: {categories[2]} years</button>
          <button onClick={() => handleBan(categories[0], 0)}>Weight: {categories[0]} pounds</button>
          <h3>Congrats Your Ideal Breed is: {name}</h3>
          <img src={src}/>
        </div>
        <button id="discover" onClick={getCat}>Discover your furball</button>
      </div>

      <div className="right-side">
        <Banned list={banList} onClick={handleUnban} />
      </div>
    </div>
  );
}

export default App;