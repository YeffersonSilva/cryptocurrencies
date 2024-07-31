import React from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Digite o nome da moeda" />
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
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-Label="Moeda">
              <div className={styles.name}>
                
                <Link to="/cripto">
                  <span> Bitcoin </span> | BTC
                </Link>
              </div>
            </td>
            <td className={styles.tdLabel} data-Label="Valor Mercado">
              1T
            </td>
            <td className={styles.tdLabel} data-Label="Preço">
            8000
            </td>
            <td className={styles.tdLabel} data-Label="Volume">
            2B
            </td>
            
            <td className={styles.tdLabel} data-Label="Volume">
            2B
            </td>
            <td className={styles.tdPronfit} data-Label="Mudança 24 Hr">

            <span>1.20</span>
            </td>
          </tr>

          
        </tbody>
      </table>
    </main>
  );
};

export default Home;
