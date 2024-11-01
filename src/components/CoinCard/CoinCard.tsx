import { useState } from "react";
import { Currency } from "../../types";
import "./CoinCard.scss";

interface CoinCardProps {
  coin: Currency;
  onFlip: (coin: Currency, flipped: boolean) => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin, onFlip }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
    onFlip(coin, !flipped);
  };

  const instructorImages: Record<string, string> = {
    "Umer Coins": "/images/umer.png",
    "Mark Bucks": "/images/mark.png",
    "Jim's Neo Coin": "/images/jim.png",
    "Kowsiya's K-Bar": "/images/kowsiya.png",
    "Michelle's CorgiCoin": "/images/michelle.png",
  };

  const instructorImage = instructorImages[coin.name];

  return (
    <div className="coin-card-wrapper">
      <h3>{coin.name || "Unknown Coin"}</h3>
      <div
        className={`coin-card ${flipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        <div className="coin-card-front"></div>
        <div className="coin-card-back">
          {instructorImage ? (
            <img
              src={instructorImage}
              alt={coin.name}
              className="instructor-image"
            />
          ) : (
            <h3>No Image Available</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
