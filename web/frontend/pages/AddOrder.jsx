import {
  Page,
  Link,
} from "@shopify/polaris";
import React from "react";
import styles from "./AddOrder.module.css";
import { CardAddProducts } from "./card-addProducts/CardAddProducts";
import { CardPaymentDetail } from "./card-payment/CardPaymentDetail";
import { CardReason } from "./card-reason/CardReason";
import { CardSumary } from "./card-sumary/CardSumary";

export default function AddOrder () {
  return (
    <Page
      breadcrumbs={[{ content: "Kitchen", url: "/kitchen" }]}
      title="D9を編集する"
      compactTitle
    >
      <section className={styles.section}>
        <div>
          <CardAddProducts />
          <div style={{ marginBottom: "15px" }}></div>
          <CardPaymentDetail />
          <div style={{ marginBottom: "15px" }}></div>
          <CardReason />
          <p style={{ textAlign: "right", marginRight: "20px", marginTop: "10px" }}><Link>注文を編集</Link>するの詳細を確認する。</p>
        </div>
        <div>
          <CardSumary />
        </div>
      </section>
    </Page>
  );
}