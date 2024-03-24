import { fetchHeroDetails } from '../../utils/utils.tsx';
import './hero-list.styles.scss.css'
import {useEffect, useState} from "react";
import Modal from "../Modal/modal.component.tsx";
import { Hero } from '../../types';

interface HeroListProps {
    heroes: string[];
}

const HeroList: React.FC<HeroListProps> = ({ heroes }) => {
    const [heroDetails, setHeroDetails] = useState<Hero[]>([]);
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const details = await Promise.all(heroes.map(hero => fetchHeroDetails(hero.id)));
            setHeroDetails(details);
        };

        fetchDetails();
    }, [heroes]);

    const openModal = (hero: Hero) => {
        setSelectedHero(hero);
    };

    const closeModal = () => {
        setSelectedHero(null);
    };

    return (
        <div className="table">
            <Modal isOpen={!!selectedHero} onClose={closeModal} hero={selectedHero} />
            <div className="table-header">
                <div>
                    Hero Id
                </div>
                <div>
                    Hero Name
                </div>
                <div>
                    Show More
                </div>
            </div>
            {heroDetails.map((hero, index) => (
                <div className={`table-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`} key={index}>
                    <div>{hero.id}</div>
                    <div>{hero.name}</div>
                    <button onClick={() => openModal(hero)}>Show more</button>
                </div>
            ))}
        </div>
    );
};

export default HeroList;
