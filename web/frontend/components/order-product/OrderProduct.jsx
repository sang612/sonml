import { Badge, Card, Thumbnail } from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import clsx from "clsx";
import styles from "./OrderProduct.module.css";

export const OrderProduct = ({
  quantity,
  name,
  price,
  className,
  ...props
}) => (
  <Card.Subsection>
    <div className={clsx(styles.row, styles.className)}>
      <div className={styles.imgContainer}>
        <Thumbnail source={ImageMajor} size="small" />
        <div className={styles.badgeContainer}>
          <Badge>{quantity}</Badge>
        </div>
      </div>
      <div className={styles.itemInfor}>
        <h3 className={styles.fontBold}>{name}</h3>
        <span className={styles.textRight}>
          ¥{price} × {quantity}
        </span>
        <span className={styles.textRight}>¥{price * quantity}</span>
      </div>
    </div>
  </Card.Subsection>
);
