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
const customers = [
  {
    注文: "#1001",
    日付: "Jon",
    観客: 35,
    合計: "Snow",
    決済状況: "Jon",
    アイテム: 35,
    配逹方法: "asd",
    タグ: "xyz",
  },
  {
    注文: "#1002",
    日付: "Jon",
    観客: 35,
    合計: "Snow",
    決済状況: "Jon",
    アイテム: 35,
    配逹方法: "asd",
    タグ: "xyz",
  },
  {
    注文: "#1003",
    日付: "Jon",
    観客: 35,
    合計: "Snow",
    決済状況: "Jon",
    アイテム: 35,
    配逹方法: "asd",
    タグ: "xyz",
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

export function AdminFormEstimate() {
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customers);
  const [queryValue, setQueryValue] = useState(null);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);
  const filters = [];
  const rowMarkup = customers.map(
    ({ 注文, 日付, 観客, 合計, 決済状況, アイテム, 配逹方法, タグ }, index) => (
      <IndexTable.Row
        id={注文}
        key={注文}
        selected={selectedResources.includes(注文)}
        position={index}
      >
        <IndexTable.Cell>
          <DisplayText variant="bodyMd" fontWeight="bold" as="span">
            {注文}
          </DisplayText>
        </IndexTable.Cell>
        <IndexTable.Cell>{日付}</IndexTable.Cell>
        <IndexTable.Cell>{観客}</IndexTable.Cell>
        <IndexTable.Cell>{合計}</IndexTable.Cell>
        <IndexTable.Cell>{決済状況}</IndexTable.Cell>
        <IndexTable.Cell>{アイテム}</IndexTable.Cell>
        <IndexTable.Cell>{配逹方法}</IndexTable.Cell>
        <IndexTable.Cell>{タグ}</IndexTable.Cell>
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
              itemCount={customers.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: "注文" },
                { title: "日付" },
                { title: "観客" },
                { title: "合計" },
                { title: "決済状況" },
                { title: "アイテム" },
                { title: "配逹方法" },
                { title: "タグ" },
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
