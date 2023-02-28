import styles from "./EstimateDetail.module.css";
import { CancelMajor } from "@shopify/polaris-icons";
import clsx from "clsx";
import { Fragment } from "react";
import { ItemInDetail } from "../item-in-detail/ItemInDetail";

const renderFile = (file, index) => (
  <div
    key={index}
    className={styles.fileLink}
    onClick={() => window.open(`/api${file.path}`)}
  >
    {file.filename}
  </div>
);

export const EstimateDetail = ({ content, setShowDetail }) => (
  <div className={styles.container}>
    <div className={styles.title}>Estimate Detail</div>
    {content.products.length > 0 && (
      <>
        <div className={styles.sectionTitle}>商品情報</div>
        <div className={styles.flex}>
          <div className={clsx(styles.w150, styles.label)}>商品情報</div>
          <div className={clsx(styles.flexCol, styles.wFull)}>
            {content.products.map((i, index) => (
              <div key={index} className={styles.flexCol}>
                <ItemInDetail label="メーカー名:" value={i.factoryName} />
                <ItemInDetail label="品番:" value={i.productCode} />
                <ItemInDetail label="商品名:" value={i.productName} />
                <ItemInDetail label="数量:" value={i.productQuantity} />
                {index !== content.products.length - 1 && (
                  <div className={styles.line}></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.line}></div>
      </>
    )}
    <ItemInDetail label="工事依頼内容" value={content.contentType} />
    <div className={styles.line}></div>
    <ItemInDetail label="備考" value={content.note} />
    <div className={styles.line}></div>
    <div className={styles.sectionTitle}>お客様情報</div>
    <ItemInDetail label="お客様区分" value={content.customerType} />
    <div className={styles.line}></div>
    <ItemInDetail label="会社名" value={content.companyName} />
    <ItemInDetail
      label="会社名（フリガナ）"
      value={content.companyNamePhonetic}
    />
    <div className={styles.line}></div>
    <ItemInDetail label="お名前" value={content.name} />
    <ItemInDetail label="お名前（フリガナ）" value={content.namePhonetic} />
    <div className={styles.line}></div>
    <ItemInDetail label="メールアドレス" value={content.email} />
    <div className={styles.line}></div>
    <ItemInDetail label="郵便番号" value={content.postCode} />
    <ItemInDetail label="都道府県" value={content.district} />
    <ItemInDetail label="市区町村" value={content.city} />
    <ItemInDetail label="以降の住所" value={content.address} />
    <div className={styles.line}></div>
    <ItemInDetail label="電話番号" value={content.phoneNumber} />
    <ItemInDetail label="携帯番号" value={content.cellPhone} />
    <ItemInDetail label="FAX番号" value={content.fax} />
    <div className={styles.line}></div>
    <div className={styles.sectionTitle}>その他の情報</div>
    <ItemInDetail label="お見積り・ご注文" value={content.quoteType} />
    <div className={styles.line}></div>
    <ItemInDetail label="現場名" value={content.supplier} />
    <ItemInDetail label="建築の種別" value={content.supplierType} />
    <div className={styles.line}></div>
    <ItemInDetail label="ご利用目的" value={content.purpose} />
    <div className={styles.line}></div>
    <ItemInDetail label="お支払い方法" value={content.paymentMethod} />
    <div className={styles.line}></div>
    <ItemInDetail label="納品ご希望予定日" value={content.estimateDate} />
    <div className={styles.line}></div>
    <ItemInDetail label="ご予算" value={content.budget} />
    <div className={styles.line}></div>
    <ItemInDetail label="お問い合わせ履歴" value={content.contactHistory} />
    {content?.files?.length > 0 && (
      <>
        <div className={styles.line}></div>
        <div className={styles.flex}>
          <div className={clsx(styles.w150, styles.label)}>添付ファイル</div>
          <div className={styles.flexCol}>
            {content?.files.map((file, index) => renderFile(file, index))}
          </div>
        </div>
      </>
    )}

    <div className={styles.icon}>
      <CancelMajor onClick={() => setShowDetail(false)} />
    </div>
  </div>
);
