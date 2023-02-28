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
  { label: "お名前", value: "name", disabled: true },
  { label: "メールアドレス", value: "email", disabled: true },
  { label: "電話番号", value: "phoneNumber", disabled: true },
  { label: "FAX番号", value: "fax" },
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

export function DashboardAdminFormEstimate({
  data,
  meta,
  isLoading,
  onPage,
  onSearch,
}) {
  const [selected, setSelected] = useState(0);
  const [fields, handleFieldChange] = useState([
    "name",
    "email",
    "phoneNumber",
  ]);

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
                  headings={fields.map((v) => ({ title: TABLE_HEADING[v] }))}
                >
                  {data?.map((item) => (
                    <IndexTable.Row
                      id={item.id}
                      key={item.id}
                      position={item.id}
                    >
                      {fields?.map((k) => (
                        <IndexTable.Cell key={k}>{item[k]}</IndexTable.Cell>
                      ))}
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
