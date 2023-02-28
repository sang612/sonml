import React from 'react';
import { Fragment } from 'react';
import { ItemInDetail } from '../item-in-detail/ItemInDetail';

export const ProductListDetail = ({ product }) => {
  return (
    <Fragment>
        <ItemInDetail label="メーカー名:" value={product.factoryName} />
        <ItemInDetail label="品番:" value={product.productCode} />
        <ItemInDetail label="商品名:" value={product.productName} />
        <ItemInDetail label="数量:" value={product.productQuantity} />
    </Fragment>
  );
}