import React, { Fragment } from 'react';
import { ItemInDetail } from '../item-in-detail/ItemInDetail';

export const KitChenItemDetail = ({ content }) => {
  const renderBoolean = (item) => {
    return content[item] ? "必要" : "不要"
  }

  return (
    <Fragment>
      <ItemInDetail label="取付けるお宅区分:" value={content.houseType} />
      <ItemInDetail label="階数:" value={content.floors} />
      <ItemInDetail label="レイアウト:" value={content.layout} />
      <ItemInDetail label={<p>キッチン背面<br/>レイアウト<span>:</span></p>} value={content.layoutBehind} />
      <ItemInDetail label="キッチンの間口:" value={content.kitchenwide} />
      <ItemInDetail label="キャビネットタイプ:" value={content.cabinetType} />
      <ItemInDetail label={<p>キャビネットの<br/>扉面材希望カラー<span>:</span></p>} value={content.cabinetColor} />
      <ItemInDetail label="扉グレード:" value={content.doorType} />
      <ItemInDetail label="吊戸棚:" value={renderBoolean("hangingCabinet")} />
      <ItemInDetail label={<p>吊戸棚<br/>手元照明（棚下灯）<span>:</span></p>} value={renderBoolean("light")} />
      <ItemInDetail label={<p>吊戸棚<br/>耐震ラッチ:</p>} value={renderBoolean("antiEarthquakeLatch")} />
      <ItemInDetail label="カウンターの材質:" value={content.counterMaterial} />
      <ItemInDetail label="カウンターの高さ:" value={content.counterHeight} />
      <ItemInDetail label="シンクの材質:" value={content.sinkMaterial} />
      <ItemInDetail label="シンクの位置:" value={content["sinkPosition"] ? "左側" : "右側"} />
      <ItemInDetail label="水栓金具:" value={content.tapType} />
      <ItemInDetail label="設置場所による仕様:" value={content.specType} />
      <ItemInDetail label="浄水器:" value={content.waterPurifier} />
      <ItemInDetail label="調理機器:" value={content.stoveType} />
      <ItemInDetail label="魚焼きグリル:" value={content.ovenType} />
      <ItemInDetail label={<p>調理機器<br/>希望カラー<span>:</span></p>} value={content.stoveColor} />
      <ItemInDetail label="レンジフード:" value={content.kitchenHoodType} />
      <ItemInDetail label={<p>レンジフード<br/>希望カラー<span>:</span></p>} value={content.kitchenHoodColor} />
      <ItemInDetail label="食器洗い乾燥機:" value={content.dishwasherType} />
      <ItemInDetail label={<p>食器洗い乾燥機<br/>希望カラー<span>:</span></p>} value={content.dishwasherColor} />
      <ItemInDetail label={<p>食器洗い乾燥機<br/>タイプ<span>:</span></p>} value={content.dishwasherSegment} />
      <ItemInDetail label="キッチンパネル:" value={content.kitchenPanelType} />
      <ItemInDetail label={<p>キッチンパネル<br/>希望カラー<span>:</span></p>} value={content.kitchenPanelColor} />
      <ItemInDetail label={<p>入替前の状態<br/>水栓位置<span>:</span></p>} value={content.tapPoistionMoment} />
      <ItemInDetail label={<p>入替前の状態<br/>調理機器<span>:</span></p>} value={content.stovePoistionMoment} />
      <ItemInDetail
        label={<p>入替前の状態<br/>レンジフード<span>:</span></p>}
        value={content.kitchenHoodPoistionMoment}
      />
      <ItemInDetail
        label="入替前の状態組込型食器洗い乾燥機:"
        value={content.dishwasherPoistionMoment}
      />
      <ItemInDetail label="工事依頼内容:" value={content.contentType} />
      <ItemInDetail label="備考:" value={content.note} />
    </Fragment>
  );
}