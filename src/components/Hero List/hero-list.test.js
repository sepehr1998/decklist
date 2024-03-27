import React from 'react';
import {render, screen} from '@testing-library/react';
import HeroList from './hero-list.component';
import {LoadingProvider} from "../../contexts/loading.context";

describe('HeroList Component', () => {
    it('renders list view by default', () => {
        render(
            <LoadingProvider>
                <HeroList deckName="Test Deck" heroes={[]} viewMode="list" />
            </LoadingProvider>
        );
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Attack')).toBeInTheDocument();
        expect(screen.getByText('Defense')).toBeInTheDocument();
        expect(screen.getByText('Health')).toBeInTheDocument();
        expect(screen.getByText('More Information')).toBeInTheDocument();
    });

    it('renders grid view when specified', () => {
       render(
            <LoadingProvider>
                <HeroList deckName="Test Deck" heroes={[]} viewMode="grid" />
            </LoadingProvider>);
        expect(screen.queryByText('Name')).not.toBeInTheDocument();
    });
});
