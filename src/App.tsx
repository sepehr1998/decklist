import { useState } from 'react';
import './App.css';
// @ts-ignore
import SearchBar from './components/Search Bar/searchbar.component.tsx';
// @ts-ignore
import HeroList from './components/Hero List/hero-list.component.tsx';
// @ts-ignore
import Header from "./components/Header/header.component.tsx";

function App() {
  const [deckData, setDeckData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');


  const handleDeckFetch = (data: any) => {
    setDeckData(data);
    console.log(data);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  return (
      <div className="App">
          {deckData ? (
              <div className="content-container">
                  <Header deckName={deckData.name} onDeckFetch={handleDeckFetch} onViewModeChange={handleViewModeChange}/>
                  <HeroList
                      deckName={deckData.name}
                      heroes={deckData.heroes}
                      viewMode={viewMode}
                  />
              </div>
          ) : (
              <div>
                  <h1>Enter the Deck ID</h1>
                  <SearchBar onDeckFetch={handleDeckFetch} visible />
              </div>
          )}
      </div>
  );
}

export default App;
