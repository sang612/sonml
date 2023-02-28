import {
  IndexTable,
  Card,
  Filters,
  DisplayText,
  useIndexResourceState,
  Tabs,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
  ChoiceList,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { Button } from "@shopify/polaris";
import { Pagination } from "@mui/material";
import dayjs from "dayjs";

const tabs = [
  {
    id: "all-Proposal-1",
    content: "すべて",
    accessibilityLabel: "All Proposal",
    panelID: "all-Proposal-content-1",
  },
];

const resourceName = {
  singular: "proposal",
  plural: "proposals",
};

const FIELD_OPTIONS = [
  { label: "ID", value: "id", disabled: true },
  { label: "お名前", value: "name", disabled: true },
  {
    label: "日付",
    value: "createdAt",
    disabled: true,
    render: (value, item) => dayjs(value).format("YYYY-MM-DD hh:mm:ss"),
  },
  { label: "お名前（フリガナ）", value: "namePhonetic" },
  { label: "メールアドレス", value: "email" },
  { label: "電話番号", value: "phoneNumber" },
  { label: "FAX番号", value: "fax" },
  { label: "こだわりポイント", value: "discerning" },
  { label: "取付けるお宅区分", value: "houseType" },
  { label: "階数", value: "floors" },
  { label: "レイアウト", value: "layout" },
  { label: "キッチン背面 レイアウト", value: "layoutBehind" },
  { label: "キッチンの間口", value: "kitchenwide" },
  { label: "キャビネットタイプ", value: "cabinetType" },
  { label: "キャビネットの扉 面材希望カラー", value: "cabinetColor" },
  { label: "扉グレード", value: "doorType" },
  {
    label: "吊戸棚",
    value: "hangingCabinet",
    render: (value, item) => (value ? "必要" : "不要"),
  },
  {
    label: "吊戸棚 手元照明（棚下灯）",
    value: "light",
    render: (value, item) => (value ? "必要" : "不要"),
  },
  {
    label: "吊戸棚耐震ラッチ",
    value: "antiEarthquakeLatch",
    render: (value, item) => (value ? "必要" : "不要"),
  },
  { label: "カウンターの材質", value: "counterMaterial" },
  { label: "カウンターの高さ", value: "counterHeight" },
  { label: "シンクの材質", value: "sinkMaterial" },
  {
    label: "シンクの位置",
    value: "sinkPosition",
    render: (value, item) => (value ? "左側" : "右側"),
  },
  { label: "水栓金具", value: "tapType" },
  { label: "設置場所による仕様", value: "specType" },
  { label: "浄水器", value: "waterPurifier" },
  { label: "調理機器", value: "stoveType" },
  { label: "調理機器希望カラー", value: "stoveColor" },
  { label: "魚焼きグリル", value: "ovenType" },
  { label: "レンジフード", value: "kitchenHoodType" },
  { label: "レンジフード希望カラー", value: "kitchenHoodColor" },
  { label: "食器洗い乾燥機", value: "dishwasherType" },
  { label: "食器洗い乾燥機希望カラー", value: "dishwasherColor" },
  { label: "食器洗い乾燥機タイプ", value: "dishwasherSegment" },
  { label: "キッチンパネル", value: "kitchenPanelType" },
  { label: "キッチンパネル希望カラー", value: "kitchenPanelColor" },
  { label: "入替前の状態水栓位置", value: "tapPoistionMoment" },
  { label: "入替前の状態調理機器", value: "stovePoistionMoment" },
  {
    label: "入替前の状態組込型食器洗い乾燥機",
    value: "dishwasherPoistionMoment",
  },
  {
    label: "入替前の状態 レンジフード",
    value: "kitchenHoodPoistionMoment",
  },
  { label: "工事依頼内容", value: "contentType" },
  { label: "備考", value: "note" },
  { label: "添付ファイル", value: "files" },
  { label: "お客様区分", value: "customerType" },
  { label: "会社名", value: "companyName" },
  { label: "会社名（フリガナ）", value: "companyNamePhonetic" },
  { label: "郵便番号", value: "postCode" },
  { label: "都道府県", value: "district" },
  { label: "市区町村", value: "city" },
  { label: "以降の住所", value: "address" },
  { label: "携帯番号", value: "cellPhone" },
  { label: "お問い合わせ内容", value: "content" },
  { label: "お見積り・ご注文", value: "quoteType" },
  { label: "現場名", value: "supplier" },
  { label: "建築の種別", value: "supplierType" },
  { label: "ご利用目的", value: "purpose" },
  { label: "お支払い方法", value: "paymentMethod" },
  { label: "納品ご希望予定日", value: "estimateDate" },
  { label: "ご予算", value: "budget" },
  { label: "お問い合わせ履歴", value: "contactHistory" },
];

const TIMEOUT_INSEARCH = 3000;

const TABLE_HEADING = FIELD_OPTIONS.reduce(
  (obj, item) => ({
    ...obj,
    [item.value]: item.label,
  }),
  {}
);

let ketdownTimeout;

const FIELD_LIST = FIELD_OPTIONS.reduce((obj, item) => ({
  ...obj,
  [item.value]: item,
}));

const renderRow = (fields, item) =>
  fields.map((key) => {
    const field = FIELD_LIST[key];
    if (field?.value === "name") {
      return (
        <div style={{ fontSize: "16px", fontWeight: 375 }}>
          <IndexTable.Cell key={key}>{item[key]}</IndexTable.Cell>
        </div>
      );
    }

    if (field?.render && typeof field?.render === "function") {
      return (
        <IndexTable.Cell key={key}>
          {field?.render(item[key], item)}
        </IndexTable.Cell>
      );
    }

    return <IndexTable.Cell key={key}>{item[key]}</IndexTable.Cell>;
  });

export function DashboardAdminFormKitchen({
  data,
  meta,
  isLoading,
  onPage,
  onSearch,
  showDetail,
  setShowDetail,
  setContent,
}) {
  const [selected, setSelected] = useState(0);
  const [fields, handleFieldChange] = useState(["id", "createdAt", "name"]);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);

  const [queryValue, _setQueryValue] = useState(null);

  const setQueryValue = useCallback(
    (v) => {
      _setQueryValue(v);

      // Handle call API search
      clearTimeout(ketdownTimeout);

      ketdownTimeout = setTimeout(() => onSearch(v), TIMEOUT_INSEARCH);
    },
    [_setQueryValue]
  );

  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);

  const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);

  const filters = [
    {
      key: "fields",
      label: "列",
      filter: (
        <ChoiceList
          choices={FIELD_OPTIONS}
          selected={fields || []}
          onChange={handleFieldChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  return (
    <>
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section>
            <div style={{ marginTop: "-1.2rem", marginLeft: "-1.2rem" }}>
              <div style={{ padding: "16px", display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <Filters
                    queryValue={queryValue}
                    filters={filters}
                    onQueryChange={setQueryValue}
                    onQueryClear={handleQueryValueRemove}
                    onClearAll={handleClearAll}
                    queryPlaceholder="名前、メールアドレス等を検索"
                  />
                </div>
                <div style={{ paddingLeft: "0.25rem" }}>
                  <Button>More action in here</Button>
                </div>
              </div>
              {isLoading ? (
                <Card sectioned>
                  <TextContainer>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText />
                  </TextContainer>
                </Card>
              ) : (
                <IndexTable
                  resourceName={resourceName}
                  itemCount={meta?.total}
                  selectedItemsCount={
                    allResourcesSelected ? "All" : selectedResources.length
                  }
                  onSelectionChange={handleSelectionChange}
                  headings={fields.map((v) => ({
                    title: (
                      <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        {TABLE_HEADING[v]}
                      </div>
                    ),
                  }))}
                >
                  {data?.map((item) => (
                    <IndexTable.Row
                      style={{ pointer: "cursor" }}
                      onClick={() => {
                        setContent(item);
                        setShowDetail(true);
                      }}
                      id={item.id}
                      key={item.id}
                      position={item.id}
                    >
                      {renderRow(fields, item)}
                    </IndexTable.Row>
                  ))}
                </IndexTable>
              )}
            </div>
          </Card.Section>
        </Tabs>
      </Card>
      {meta && (
        <div
          style={{
            display: "flex",
            margin: "40px 0",
            justifyContent: "center",
          }}
        >
          <Pagination
            defaultPage={meta?.page}
            variant="outlined"
            color="primary"
            onChange={(_, p) => onPage(p)}
            count={Math.round(meta?.total / meta?.limit)}
          />
        </div>
      )}
    </>
  );
}
