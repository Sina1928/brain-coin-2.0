import { useState } from "react";
import { Currency } from "../../types/index.ts";
import CoinCard from "../CoinCard/CoinCard.tsx";
import "./About.scss";

const About: React.FC = () => {
  const coins: Currency[] = [
    {
      name: "Umer Coins",
      description: "Earned by answering questions in class.",
      conversionRateToMarkBucks: 0.2,
    },
    {
      name: "Mark Bucks",
      description: "Base currency for all conversions.",
      conversionRateToMarkBucks: 1,
    },
    {
      name: "Kowsiya's K-Bar",
      description: "1 K-Bar = 500 Mark Bucks.",
      conversionRateToMarkBucks: 500,
    },
    {
      name: "Michelle's CorgiCoin",
      description: "1 CorgiCoin = 500 Mark Bucks.",
      conversionRateToMarkBucks: 500,
    },
    {
      name: "Jim's Neo Coin",
      description: "1 Neo Coin = 1000 Mark Bucks.",
      conversionRateToMarkBucks: 1000,
    },
  ];

  const [selectedCoin, setSelectedCoin] = useState<Currency | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlip = (coin: Currency, flipped: boolean) => {
    setSelectedCoin(flipped ? coin : null);
    setIsFlipped(flipped);
  };

  return (
    <div className="about-page">
      <h1>About BrainCoins</h1>
      <div className="coins-inline">
        {coins.map((coin) => (
          <CoinCard key={coin.name} coin={coin} onFlip={handleFlip} />
        ))}
      </div>
      {selectedCoin && isFlipped && (
        <div className="coin-info-dropdown">
          <h3>{selectedCoin.name}</h3>
          <p>{selectedCoin.description}</p>
          <p>Value: {selectedCoin.conversionRateToMarkBucks} Mark Bucks</p>
        </div>
      )}
      <div className="about-app fancy-section">
        <h2 className="fancy-heading">What are BrainCoins?</h2>
        <ul className="fancy-list">
          <li>
            <strong>Mark's Tiny Baby Legs Fund:</strong> Mark's running on baby
            legs, often switching places with his "twin" Mike. It's hard to keep
            up, but his mom still loves him!
          </li>
          <li>
            <strong>Umer's Meme Mansion:</strong> Umer's building the ultimate
            Meme Mansion. Earn enough Umer Coins, and you might just get an
            invite to the grand opening!
          </li>
          <li>
            <strong>Jim's Cat Kingdom:</strong> Jim dreams of a cat-filled
            utopia, and with every Neo Coin, you're helping fund his feline
            ambitions. Meow!
          </li>
          <li>
            <strong>Kowsiya's Green Thumb:</strong> Whether she's hiking or
            gardening, Kowsiya's nurturing minds and plants alike. Earn K-Bars
            and maybe score a gardening tip!
          </li>
          <li>
            <strong>Michelle's Sweet Tech Journey:</strong> From baker to
            full-stack developer, Michelle swapped bread dough for code—her
            CorgiCoins are as sweet as her cakes used to be!
          </li>
        </ul>
        <div className="final-line">
          <strong>BrainCoins:</strong> Earn them, laugh hard, and turn learning
          into a rewarding adventure!
        </div>
      </div>
    </div>
  );
};

export default About;
