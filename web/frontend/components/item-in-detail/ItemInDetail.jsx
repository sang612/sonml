import clsx from 'clsx'
import styles from './ItemInDetail.module.css';

export const ItemInDetail = ({ label, value, className, ...props }) => {
  return (
    <div className={clsx(styles.flex, styles.className)}>
        <div className={clsx(styles.w150, styles.label)}>{label}</div>
        <p>{value ? value : "..."}</p>
    </div>
  )
}
