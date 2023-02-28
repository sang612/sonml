import {
  IndexTable,
  Card,
  Filters,
  DisplayText ,
  useIndexResourceState,
  Tabs,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { ButtonGroup, Button } from "@shopify/polaris";
import { FilterMinor } from "@shopify/polaris-icons";
import { Columns3Minor } from "@shopify/polaris-icons";
import { SortMinor } from "@shopify/polaris-icons";
import { HorizontalDotsMinor } from "@shopify/polaris-icons";

const tabs = [
  {
    id: "all-customers-1",
    content: "すべて",
    accessibilityLabel: "All customers",
    panelID: "all-customers-content-1",
  },
  {
    id: "accepts-marketing-1",
    content: "未発送",
    panelID: "accepts-marketing-content-1",
  },
  {
    id: "repeat-customers-1",
    content: "未払い",
    panelID: "repeat-customers-content-1",
  },
  {
    id: "prospects-1",
    content: "オープン",
    panelID: "prospects-content-1",
  },
  {
    id: "prospects-2",
    content: "クローズ",
    panelID: "prospects-content-1",
  },
];
const resourceName = {
  singular: "customer",
  plural: "customers",
};
const FilterActionButton = () => (
  <ButtonGroup segmented>
    <Button icon={FilterMinor}>絞り込む</Button>
    <Button icon={Columns3Minor}>列</Button>
    <Button icon={SortMinor}>並び替え</Button>
  </ButtonGroup>
);

export function AdminFormKitchen({data}) {
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);
  const [queryValue, setQueryValue] = useState(null);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);
  const filters = [];
  const rowMarkup = data?.map(
    ({id,
      products,
      discerning,
      houseType,
      floors,
      layout,
      layoutBehind,
      kitchenwide,
      cabinetType,
      cabinetColor,
      doorType,
      hangingCabinet,
      light,
      antiEarthquakeLatch,
      counterMaterial,
      counterHeight,
      sinkMaterial,
      sinkPosition,
      tapType,
      specType,
      waterPurifier,
      stoveType,
      stoveColor,
      ovenType,
      kitchenHoodType,
      kitchenHoodColor,
      dishwasherType,
      dishwasherColor,
      dishwasherSegment,
      kitchenPanelType,
      kitchenPanelColor,
      tapPoistionMoment,
      stovePoistionMoment,
      kitchenHoodPoistionMoment,
      dishwasherPoistionMoment,
      jobType,
      note,
      files,
      customerType,
      companyName,
      companyNamePhonetic,
      name,
      namePhonetic,
      email,
      postCode,
      district,
      city,
      address,
      phoneNumber,
      cellPhone,
      fax,
      content,
      quoteType,
      supplier,
      supplierType,
      purpose,
      paymentMethod,
      estimateDate,
      budget,
      contactHistory },item, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <DisplayText size="small">
            注文
          </DisplayText>
        </IndexTable.Cell>
        <IndexTable.Cell>{products}</IndexTable.Cell>
        <IndexTable.Cell>{discerning}</IndexTable.Cell>
        <IndexTable.Cell>{houseType}</IndexTable.Cell>
        <IndexTable.Cell>{floors}</IndexTable.Cell>
        <IndexTable.Cell>{layout}</IndexTable.Cell>
        <IndexTable.Cell>{layoutBehind}</IndexTable.Cell>
        <IndexTable.Cell>{kitchenwide}</IndexTable.Cell>
        <IndexTable.Cell>{cabinetType}</IndexTable.Cell>
        <IndexTable.Cell>{cabinetColor}</IndexTable.Cell>
        <IndexTable.Cell>{doorType}</IndexTable.Cell>
        <IndexTable.Cell>{hangingCabinet}</IndexTable.Cell>
        <IndexTable.Cell>{light}</IndexTable.Cell>
        <IndexTable.Cell>{antiEarthquakeLatch}</IndexTable.Cell>
        <IndexTable.Cell>{counterMaterial}</IndexTable.Cell>
        <IndexTable.Cell>{counterHeight}</IndexTable.Cell>
        <IndexTable.Cell>{sinkMaterial}</IndexTable.Cell>
        <IndexTable.Cell>{sinkPosition}</IndexTable.Cell>
        <IndexTable.Cell>{tapType}</IndexTable.Cell>
        <IndexTable.Cell>{specType}</IndexTable.Cell>
        <IndexTable.Cell>{waterPurifier}</IndexTable.Cell>
        <IndexTable.Cell>{stoveType}</IndexTable.Cell>
        <IndexTable.Cell>{stoveColor}</IndexTable.Cell>
        <IndexTable.Cell>{ovenType}</IndexTable.Cell>
        <IndexTable.Cell>{kitchenHoodType}</IndexTable.Cell>
        <IndexTable.Cell>{kitchenHoodColor}</IndexTable.Cell>
        <IndexTable.Cell>{dishwasherType}</IndexTable.Cell>
        <IndexTable.Cell>{dishwasherColor}</IndexTable.Cell>
        <IndexTable.Cell>{dishwasherSegment}</IndexTable.Cell>
        <IndexTable.Cell>{kitchenPanelType}</IndexTable.Cell>
        <IndexTable.Cell>{kitchenPanelColor}</IndexTable.Cell>
        <IndexTable.Cell>{tapPoistionMoment}</IndexTable.Cell>
        <IndexTable.Cell>{stovePoistionMoment}</IndexTable.Cell>
        <IndexTable.Cell>{kitchenHoodPoistionMoment}</IndexTable.Cell>
        <IndexTable.Cell>{dishwasherPoistionMoment}</IndexTable.Cell>
        <IndexTable.Cell>{jobType}</IndexTable.Cell>
        <IndexTable.Cell>{note}</IndexTable.Cell>
        <IndexTable.Cell>{files}</IndexTable.Cell>
        <IndexTable.Cell>{customerType}</IndexTable.Cell>
        <IndexTable.Cell>{companyName}</IndexTable.Cell>
        <IndexTable.Cell>{companyNamePhonetic}</IndexTable.Cell>
        <IndexTable.Cell>{name}</IndexTable.Cell>
        <IndexTable.Cell>{namePhonetic}</IndexTable.Cell>
        <IndexTable.Cell>{email}</IndexTable.Cell>
        <IndexTable.Cell>{postCode}</IndexTable.Cell>
        <IndexTable.Cell>{district}</IndexTable.Cell>
        <IndexTable.Cell>{city}</IndexTable.Cell>
        <IndexTable.Cell>{address}</IndexTable.Cell>
        <IndexTable.Cell>{phoneNumber}</IndexTable.Cell>
        <IndexTable.Cell>{cellPhone}</IndexTable.Cell>
        <IndexTable.Cell>{fax}</IndexTable.Cell>
        <IndexTable.Cell>{content}</IndexTable.Cell>
        <IndexTable.Cell>{quoteType}</IndexTable.Cell>
        <IndexTable.Cell>{supplier}</IndexTable.Cell>
        <IndexTable.Cell>{supplierType}</IndexTable.Cell>
        <IndexTable.Cell>{purpose}</IndexTable.Cell>
        <IndexTable.Cell>{paymentMethod}</IndexTable.Cell>
        <IndexTable.Cell>{estimateDate}</IndexTable.Cell>
        <IndexTable.Cell>{budget}</IndexTable.Cell>
        <IndexTable.Cell>{contactHistory}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section>
          <div style={{ marginTop: "-1.2rem", marginLeft: "-1.2rem" }}>
            <div style={{ padding: "16px", display: "flex" }}>
              <div style={{ flex: 1 }}>
                <Filters
                  children={
                    <div style={{ paddingLeft: "0.25rem" }}>
                      <FilterActionButton />
                    </div>
                  }
                  queryValue={queryValue}
                  filters={filters}
                  onQueryChange={setQueryValue}
                  onQueryClear={handleQueryValueRemove}
                  onClearAll={handleClearAll}
                />
              </div>
              <div style={{ paddingLeft: "0.25rem" }}>
                <Button>名前を付けて保存</Button>
              </div>
              <div style={{ paddingLeft: "0.25rem" }}>
                <Button icon={HorizontalDotsMinor}></Button>
              </div>
            </div>
            <IndexTable
              resourceName={resourceName}
              itemCount={data.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: "注文" },
                { title: "商品情報" },
                { title: "こだわりポイント" },
                { title: "取付けるお宅区分" },
                { title: "階数" },
                { title: "レイアウト" },
                { title: "キッチン背面 レイアウト" },
                { title: "キッチンの間口" },
                { title: "キャビネットタイプ" },
                { title: "キャビネットの扉 面材希望カラー" },
                { title: "扉グレード" },
                { title: "吊戸棚" },
                { title: "吊戸棚 手元照明（棚下灯）" },
                { title: "吊戸棚耐震ラッチ" },
                { title: "カウンターの材質" },
                { title: "カウンターの高さ" },
                { title: "シンクの材質" },
                { title: "シンクの位置" },
                { title: "水栓金具" },
                { title: "設置場所による仕様" },
                { title: "浄水器" },
                { title: "調理機器" },
                { title: "調理機器希望カラー" },
                { title: "魚焼きグリル" },
                { title: "レンジフード" },
                { title: "レンジフード希望カラー" },
                { title: "食器洗い乾燥機" },
                { title: "食器洗い乾燥機希望カラー" },
                { title: "食器洗い乾燥機タイプ" },
                { title: "キッチンパネル" },
                { title: "キッチンパネル希望カラー" },
                { title: "入替前の状態水栓位置" },
                { title: "入替前の状態調理機器" },
                { title: "入替前の状態レンジフード" },
                { title: "入替前の状態組込型食器洗い乾燥機" },
                { title: "工事依頼内容" },
                { title: "備考" },
                { title: "添付ファイル" },
                { title: "お客様区分" },
                { title: "会社名" },
                { title: "会社名（フリガナ）" },
                { title: "お名前" },
                { title: "お名前（フリガナ）" },
                { title: "メールアドレス" },
                { title: "郵便番号" },
                { title: "都道府県" },
                { title: "市区町村" },
                { title: "以降の住所" },
                { title: "電話番号" },
                { title: "携帯番号" },
                { title: "FAX番号" },
                { title: "お問い合わせ内容" },
                { title: "お見積り・ご注文" },
                { title: "現場名" },
                { title: "建築の種別" },
                { title: "ご利用目的" },
                { title: "お支払い方法" },
                { title: "納品ご希望予定日" },
                { title: "ご予算" },
                { title: "お問い合わせ履歴" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </div>
        </Card.Section>
      </Tabs>
    </Card>
  );
}
