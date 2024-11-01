import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { CurrencyConversion, CurrencyRates } from "../../types";
import "./CurrencyConverter.scss";

const CURRENCY_RATES: CurrencyRates = {
  MarkBucks: 1,
  UmerCoins: 5,
  KBarDinar: 0.002,
  CorgiCoin: 0.002,
  NeoCoin: 0.001,
};

const CurrencyConverter: React.FC = () => {
  const [formData, setFormData] = useState<CurrencyConversion>({
    amount: "",
    fromCurrency: "MarkBucks",
    toCurrency: "UmerCoins",
  });
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev: CurrencyConversion) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { amount, fromCurrency, toCurrency } = formData;

    if (!amount || isNaN(Number(amount))) {
      return toast.error("Please enter a valid amount");
    }

    const fromRate = CURRENCY_RATES[fromCurrency];
    const toRate = CURRENCY_RATES[toCurrency];
    const convertedAmount = (Number(amount) * toRate) / fromRate;

    setResult(Number(convertedAmount.toFixed(3)));
  };

  return (
    <div className="currency-conversion">
      <div className="title">
        <h1 className="title-text">Currency Converter</h1>
      </div>
      <div className="currency-converter">
        <form onSubmit={handleSubmit} className="currency-form">
          <div className="input-amount">
            <label htmlFor="amount" className="amount-label">
              Amount:{" "}
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              min="0"
            />
          </div>

          <div className="input-from">
            <label htmlFor="fromCurrency" className="from-label">
              From:{" "}
            </label>
            <select
              id="fromCurrency"
              name="fromCurrency"
              value={formData.fromCurrency}
              onChange={handleInputChange}
            >
              {Object.keys(CURRENCY_RATES).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="input-to">
            <label htmlFor="toCurrency" className="to-label">
              To:{" "}
            </label>
            <select
              id="toCurrency"
              name="toCurrency"
              value={formData.toCurrency}
              onChange={handleInputChange}
            >
              {Object.keys(CURRENCY_RATES).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="convert-button">
            Convert
          </button>
        </form>

        {result !== null && (
          <h2 className="converter-result">
            {formData.amount} {formData.fromCurrency} = {result}{" "}
            {formData.toCurrency}
          </h2>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
