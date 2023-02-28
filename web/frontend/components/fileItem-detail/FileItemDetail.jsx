import React from 'react';
import clsx from 'clsx'
import styles from '../item-in-detail/ItemInDetail.module.css'

export const FileItemDetail = ({content}) => {
  return (
    <div className={styles.flex}>
    <h1 className={clsx(styles.w150, styles.label)}>添付ファイル</h1>
    <div className={styles.flexCol}>
      {content?.files.map((file, index) => (
        <div key={index} className={clsx(styles.pointer)} onClick={() => {
          window.open(`/api${file.path}`)
        }}>{file.filename}</div>
      ))}
    </div>
  </div>
  );
}