import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/Search Bar/searchbar.component';
import HeroList from './components/Hero List/hero-list.component';
import Header from "./components/Header/header.component";
import {CircularProgress} from "@mui/material";
import { useLoading } from './contexts/loading.context';

function App() {
  const [deckData, setDeckData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const { loading } = useLoading();

  const handleDeckFetch = (data: any) => {
    setDeckData(data);
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
                  />
                {loading ? (
                    <CircularProgress aria-label='loading-spinner'/>
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
                  <SearchBar onDeckFetch={handleDeckFetch} visible/>
              </div>
          )}
      </div>
  );
}

export default App;
