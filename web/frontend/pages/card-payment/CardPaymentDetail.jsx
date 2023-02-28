import {
  Page,
  Card,
  TextField,
  Icon,
  Button,
  Thumbnail,
  Banner,
  Link,
} from "@shopify/polaris";
import clsx from "clsx";
import styles from "../AddOrder.module.css";
import React from 'react';

export const CardPaymentDetail = () => {
  return (
    <div>
    <Card title="見積り">
    <Card.Section>
      <Card.Subsection>
        <div className={clsx(styles.row, styles.mb5px, styles.flexEnd)}>
          <p>ディスカウント</p>
          <span>￥１００</span>
        </div>
        <div className={clsx(styles.row, styles.mb5px, styles.flexEnd)}>
          <p>小計</p>
          <span>￥１００</span>
        </div>
        <div className={clsx(styles.row, styles.mb5px, styles.flexEnd)}>
          <div>
            <p>税</p>
            <span className={styles.detail}>１０％のCT</span>
          </div>
          <span>￥１００</span>
        </div>
        <div className={clsx(styles.row, styles.mb5px, styles.flexEnd)}>
          <h3 className={styles.bold}>合計</h3>
          <span>￥１００</span>
        </div>
      </Card.Subsection>
    </Card.Section>
    <Card.Section subdued>
      <p style={{ color: "#6d7175" }}>注文が更新されるまで、 推定税額が計算される場合があります。 <Link>推定税額</Link>について詳しくは こちら</p>
    </Card.Section>
  </Card>
    </div>
  );
}