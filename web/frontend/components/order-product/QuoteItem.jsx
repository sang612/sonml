import clsx from "clsx";
import styles from "./QuoteItem.module.css";

export const QuoteItem = ({
  firstText,
  secondText,
  price,
  minus,
  className,
  bold,
  ...props
}) => (
  <div className={clsx(styles.row2, styles.className, bold && styles.fontBold)}>
    <span>{firstText}</span>
    <div className={styles.col}>
      <span>{secondText}</span>
      <span>
        {minus && "-"}¥{price}
      </span>
    </div>
  </div>
);
