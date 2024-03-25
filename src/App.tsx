import { useState } from 'react';
import './App.css';
// @ts-ignore
import SearchBar from './components/Search Bar/searchbar.component.tsx';
// @ts-ignore
import HeroList from './components/Hero List/hero-list.component.tsx';
// @ts-ignore
import Header from "./components/Header/header.component.tsx";
import {CircularProgress} from "@mui/material";

function App() {
  const [deckData, setDeckData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isLoading, setIsLoading] = useState(false);

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
                  <Header
                      deckName={deckData.name}
                      onDeckFetch={handleDeckFetch}
                      onViewModeChange={handleViewModeChange}
                      setLoading={setIsLoading}
                  />
                {isLoading ? (
                    <CircularProgress />
                ) : (
                  <HeroList
                      deckName={deckData.name}
                      heroes={deckData.heroes}
                      viewMode={viewMode}
                  />
                    )}
              </div>
          ) : (
              <div className="initial-search">
                  <h1>Enter the Deck ID</h1>
                  <SearchBar onDeckFetch={handleDeckFetch} visible setLoading={setIsLoading}/>
              </div>
          )}
      </div>
  );
}

export default App;
