import { BsSearch } from "react-icons/bs";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent, useEffect } from "react";

interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  explorer: string;
}

interface DataProps {
  data: CoinProps[];
}

const Home = () => {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch("https://api.coincap.io/v2/assets?limit=10&offset=0");
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data: DataProps = await response.json();
      
      const priceFormatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      
      const formattedData = data.data.map((item) => {
        return {
          ...item,
          priceUsd: priceFormatter.format(parseFloat(item.priceUsd)),
        };
      });

      setCoins(formattedData);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === "") {
      return;
    }
    navigate(`/detail/${input}`);
  }

  function handleMore() {
    navigate(`/detail`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#FFF" />
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor Mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24 Hr</th>
          </tr>
        </thead>
        <tbody id="ybody">
          {coins.map((coin) => (
            <tr key={coin.id} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <div className={styles.name}>
                  <Link to={`/cripto/${coin.id}`}>
                    <span>{coin.name}</span> | {coin.symbol}
                  </Link>
                </div>
              </td>
              <td className={styles.tdLabel} data-label="Valor Mercado">
                {parseFloat(coin.marketCapUsd).toFixed(2)}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {coin.priceUsd}
              </td>
              <td className={styles.tdLabel} data-label="Volume">
                {parseFloat(coin.volumeUsd24Hr).toFixed(2)}
              </td>
              <td className={styles.tdLabel} data-label="Mudança 24 Hr">
                {parseFloat(coin.changePercent24Hr).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleMore} className={styles.buttonMore}>Buscar Mais</button>
    </main>
  );
};

export default Home;
