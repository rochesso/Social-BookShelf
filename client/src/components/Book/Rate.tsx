import styles from "./Rate.module.css";
import RateItem from "./RateItem";

type AppProps = {
  book: CompleteBook;
};

const Rate = ({ book }: AppProps) => {
  let starsColored: any = [];
  let starsBlack: any = [];
  const stars = () => {
    for (let i = 1; i < 6; i++) {
      if (i <= book.status.rate) {
        // push because the order is not modified by css
        // result will be 1, 2, 3...
        starsColored.push(
          <RateItem key={i} rate={i} book={book} isColored={true} />
        );
      } else {
        // unshift because the order is modified by css so the tilde can select the antecedent siblings
        // result will be 6, 5, 4... but because css is reversing the order, you will see 4, 5, 6... when it renders
        starsBlack.unshift(
          <RateItem key={i} rate={i} book={book} isColored={false} />
        );
      }
    }
  };
  stars();
  return (
    <div className={styles.container}>
      <div className={styles.container__colored}>{starsColored}</div>
      <div className={styles.container__black}>{starsBlack}</div>
    </div>
  );
};

export default Rate;
