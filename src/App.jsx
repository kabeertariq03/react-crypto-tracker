import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`
        );
        const data = await response.json();
        setCryptoData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptoData();
  }, [page]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredCryptoData = cryptoData.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredCryptoData);
  };

  return (
    <>
      <div className="app">
        <h1>
          <span>Crypto Tracker</span>
        </h1>
        <input
          type="text"
          placeholder="Search Crypto Coin Here"
          className="App__Input"
          value={searchTerm}
          onChange={handleSearch}
        />
        {filteredData.map((crypto) => (
          <div key={crypto.id} className="app__Img__Title">
            <img src={crypto.image} alt="Coin Logo" />
            <h3>{crypto.name}</h3>
            <p>Current Price: ${crypto.current_price}</p>
            <p className="mobile-hidden">Market Cap: ${crypto.market_cap}</p>
            <p className="mobile-hidden">Volume: ${crypto.total_volume}</p>
            <p className="mobile-hidden">Rank: #{crypto.market_cap_rank}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
