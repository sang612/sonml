import styles from './ContactDetail.module.css';
import {
  CancelMajor
} from '@shopify/polaris-icons';
import clsx from "clsx"
import { ItemInDetail } from '../item-in-detail/ItemInDetail';

export const ContactDetail = ({content, setShowDetail}) => {

  return (
  <div className={styles.container}>
    <div className={styles.title}>お客様情報</div>
    <ItemInDetail label="お客様区分" value={content.customerType}/>
    <div className={styles.line}/>
    <ItemInDetail label="会社名" value={content.companyName}/>
    <ItemInDetail label="会社名（フリガナ)" value={content.companyNamePhonetic}/>
    <div className={styles.line}/>
    <ItemInDetail label="お名前" value={content.name}/>
    <ItemInDetail label="お名前（フリガナ" value={content.namePhonetic}/>
    <div className={styles.line}/>
    <ItemInDetail label="メールアドレス" value={content.email}/>
    <ItemInDetail label="郵便番号" value={content.postCode}/>
    <div className={styles.line}/>
    <ItemInDetail label="都道府県" value={content.district}/>
    <ItemInDetail label="市区町村" value={content.city}/>
    <ItemInDetail label="以降の住所" value={content.address}/>
    <ItemInDetail label="電話番号" value={content.phoneNumber}/>
    <div className={styles.line}/>
    <ItemInDetail label="携帯番号" value={content.cellPhone}/>
    <ItemInDetail label="FAX番号" value={content.fax}/>
    <ItemInDetail label="お問い合わせ内容" value={content.content}/>
    <div className={styles.line}/>
    <div className={styles.title}>商品情報</div>
    <ItemInDetail label="現場名" value={content.supplier}/>
    <ItemInDetail label="建築の種別" value={content.supplierType}/>
    <div className={styles.line}/>
    <ItemInDetail label="ご利用目的" value={content.purpose}/>
    <div className={styles.line}/>
    <ItemInDetail label="ご予算" value={content.budget}/>
    <div className={styles.line}/>
    <ItemInDetail label="お問い合わせ履歴" value={content.conntactHistory}/>

    <div className={styles.line}/>
     <div className={styles.flex}>
        <div className={clsx(styles.w150, styles.label)}>商品情報</div>
        <div className={styles.productsList}>
            {content.products.map((product, index) => (
              <div key={index} className={styles.flexCol}>
                <ItemInDetail label="メーカー名:" value={product.factoryName}/>
                <ItemInDetail label="品番:" value={product.productCode}/>
                <ItemInDetail label="商品名:" value={product.productName}/>
                <ItemInDetail label="数量:" value={product.productQuantity}/>
                <div className={styles.line}/>
              </div>
            ))}
        </div>
    </div>
    <div className={styles.line}/>
    <div className={styles.flex}>
        <h1 className={clsx(styles.w150, styles.label)}>添付ファイル</h1>
        <div className={ styles.flexCol}>
      {content?.files.map((file,index) => (
        <div  key={index} className={clsx(styles.pointer)}  onClick={() =>{
            window.open(`/api${file.path}`)
        }}>{file.filename}</div>
        ))}
        </div>
    </div>
    <div className={styles.icon}>
        <CancelMajor onClick={()=>
        setShowDetail(false)} />
    </div>
  </div>
  )
}
