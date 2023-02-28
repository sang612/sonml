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
import { ImageMajor, SearchMajor } from "@shopify/polaris-icons";
import clsx from "clsx";
import React, { useState, useCallback } from "react";
import styles from "../AddOrder.module.css";

export const CardAddProducts = () => {
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleChange = useCallback(
    (newValue) => setTextFieldValue(newValue),
    []
  );
  return (
    <div>
    <Card
    title="商品を追加する"
    actions={[{ content: "カスタム商品を追加" }]}
  >
    <Card.Section>
      <div className={styles.cardHeader}>
        <div className={styles.inputField}>
          <TextField
            label="Search templates"
            labelHidden
            type="text"
            value={textFieldValue}
            onChange={handleChange}
            prefix={<Icon source={SearchMajor} />}
            placeholder="追加する商品を検索する"
          />
        </div>
        <Button>閲覧する</Button>
      </div>
      <div className={styles.mb15px}>
        <Banner status="info">
          <p>適用されるこのディスカウントでは、一部のアイテムの数量を調整できません。</p>
        </Banner>
      </div>
      <div>
        <Card.Subsection>
          <div className={clsx(styles.row, styles.mb5px, styles.flexStart)}>
            <div className={styles.itemContainer}>
              <div className={styles.imgContainer}>
                <Thumbnail source={ImageMajor} size="small" />
              </div>
              <div className={styles.itemInfor}>
                <h3 className={styles.bold}>テスト０１</h3>
                <span>1  × ￥１００</span>
                <ul>
                  <li className={styles.discount}>ディスカウント (-￥34)</li>
                    </ul>
                    <div style={{marginTop: "6px"}}>
                      <Link removeUnderline>アイテムを削除すろ</Link>
                    </div>
              </div>
            </div>
            <span>￥１００</span>
          </div>
        </Card.Subsection>
        <Card.Subsection>
          <div className={clsx(styles.row, styles.mb5px, styles.flexStart)}>
            <div className={styles.itemContainer}>
              <div className={styles.imgContainer}>
                <Thumbnail source={ImageMajor} size="small" />
              </div>
              <div className={styles.itemInfor}>
                <h3 className={styles.bold}>テスト０２</h3>
                <span>1  × ￥１００</span>
                <ul>
                  <li className={styles.discount}>ディスカウント (-￥34)</li>
                </ul>
                <div style={{marginTop: "6px"}}>
                      <Link removeUnderline>アイテムを削除すろ</Link>
                    </div>
              </div>
            </div>
            <span>￥１００</span>
          </div>
        </Card.Subsection>
      </div>
    </Card.Section>
  </Card>
    </div>
  );
}