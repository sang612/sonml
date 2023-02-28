import React from 'react';
import { Fragment } from 'react';
import { ItemInDetail } from '../item-in-detail/ItemInDetail';

export const CustomerInforDetail = ({content}) => {
  return (
    <Fragment>
      <ItemInDetail label="お客様区分:" value={content.customerType} />
      <ItemInDetail label="会社名:" value={content.companyName} />
      <ItemInDetail label="会社名（フリガナ）:" value={content.companyNamePhonetic} />
      <ItemInDetail label="お名前:" value={content.name} />
      <ItemInDetail label="お名前（フリガナ）:" value={content.namePhonetic} />
      <ItemInDetail label="メールアドレス:" value={content.email} />
      <ItemInDetail label="郵便番号:" value={content.postCode} />
      <ItemInDetail label="都道府県:" value={content.district} />
      <ItemInDetail label="市区町村:" value={content.city} />
      <ItemInDetail label="以降の住所:" value={content.address} />
      <ItemInDetail label="電話番号:" value={content.phoneNumber} />
      <ItemInDetail label="携帯番号:" value={content.cellPhone} />
      <ItemInDetail label="FAX番号:" value={content.fax} />
      <ItemInDetail label="お問い合わせ内容:" value={content.content} />
    </Fragment>
  );
}