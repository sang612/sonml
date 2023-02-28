import styles from './KitchenDetail.module.css';
import { CancelMajor } from '@shopify/polaris-icons';
import { ItemInDetail } from '../item-in-detail/ItemInDetail';
import clsx from "clsx"
import { KitChenItemDetail } from './KitChenItemDetail';
import { FileItemDetail } from '../fileItem-detail/FileItemDetail';
import { CustomerInforDetail } from '../customerInfor-detail/CustomerInforDetail';
import { AnotherInforDetail } from '../anotherInfor-detail/AnotherInforDetail';
import { ProductListDetail } from '../productList-detail/ProductListDetail';

export const KitchenDetail = ({ content, setShowDetail }) => {

  return (
    <div div className={styles.container} >
      <div className={styles.title}>Kitchen Detail</div>
      <div className={styles.sectionTitle}>商品情報</div>
      <div className={styles.flex}>
        <div className={clsx(styles.w150, styles.label)}>商品情報</div>
        <div className={clsx(styles.flexCol, styles.wFull)}>
          {content.products.map((product, index) => (
          <div key={index} className={styles.flexCol}>
            <ProductListDetail product={product}/>  
            <div className={styles.line}/>
          </div>
        ))}
      </div>
      </div>
      <ItemInDetail label="こだわりポイント:" value={content.discerning}/>
      <div className={styles.line} />
      <div className={styles.sectionTitle}>システムキッチン情報</div>
      <KitChenItemDetail content={content} />
      <div className={styles.line} />
      <div className={styles.sectionTitle}>お客様情報</div>
      <CustomerInforDetail content={content}/>
      <div className={styles.line} />
      <div className={styles.sectionTitle}>その他の情報</div>
      <AnotherInforDetail content={content} />
      <div className={styles.line} />
      <FileItemDetail content={content}/>
      <div className={styles.icon}>
        <CancelMajor onClick={() =>
          setShowDetail(false)} />
      </div>
    </div>
  )
}