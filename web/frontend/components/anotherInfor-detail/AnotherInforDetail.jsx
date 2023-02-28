import React, { Fragment } from 'react';
import { ItemInDetail } from '../item-in-detail/ItemInDetail';
import * as dayjs from 'dayjs'

export const AnotherInforDetail = ({content}) => {
  return (
    <Fragment>
    <ItemInDetail label="お見積り・ご注文:" value={content.quoteType}/>
    <ItemInDetail label="現場名:" value={content.supplier}/>
    <ItemInDetail label="建築の種別:" value={content.supplierType}/>
    <ItemInDetail label="ご利用目的:" value={content.purpose}/>
    <ItemInDetail label="お支払い方法:" value={content.paymentMethod}/>
      <ItemInDetail label="納品ご希望予定日:" value={content.estimateDate} />
      <ItemInDetail label="お問い合わせ履歴:" value={content.contactHistory}/>
    </Fragment>
  );
}