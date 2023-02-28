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
  ChoiceList
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { Button } from "@shopify/polaris";
import { Pagination } from "@mui/material";
import { default as dayjs } from 'dayjs';
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";

const FIELD_OPTIONS = [
    { label: "ID", value: "id", disabled: true },
    { label: "date", value: "createdAt", disabled: true },
    { label: "お名前", value: "name", disabled: true },
  ];
  const resourceName = {
    singular: "Draft order",
    plural: "Draft orders"
  };
  const TABLE_HEADING = FIELD_OPTIONS.reduce(
    (obj, item) => ({
      ...obj,
      [item.value]: item.label
    }),
    {}
  );
   const FIELD_LIST = FIELD_OPTIONS.reduce((obj, item) => ({
    ...obj,
    [item.value]: item
  }));

// dayjs.extend(relativeTime)

export const DraftOrder = ({
  data,
  meta,
  isLoading,
  onPage,
  onSearch,
  showDetail,
  setShowDetail,
  setContent
}) => {
  const fetch = useAuthenticatedFetch();

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const {
    selectedResources,
    allResourcesSelected,
  } = useIndexResourceState(data);

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
  const [fields, handleFieldChange] = useState(["id", "createdAt", "name", "Files"]);

  

  const createOrder = async (id) => {
    try {
      const rs = await fetch(`/api/kitchen/${id}`, {
        method: "POST"
      });
      console.log("rs:", await rs.json());
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const renderRow = (fields, item) =>
    fields.map((key) => {
      const field = FIELD_LIST[key];
      if (field?.render && typeof field?.render === "function") {
        return (
          <IndexTable.Cell key={key}>
            {field?.render(item[key], item)}
          </IndexTable.Cell>
        );
      }
      return <IndexTable.Cell key={key}>
        {key === "createdAt" ? dayjs(item[key]).format("YYYY/MM/DD HH:MM:ss") : item[key]}
        </IndexTable.Cell>;
    });
 
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
      shortcut: true
    }
  ];

  return (
    <>
      <Card>
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
                <Button>More action in here kitchen</Button>
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
                headings={fields.map((v) => ({ title: TABLE_HEADING[v] }))}
              >
                {data?.map((item) => (
                  <IndexTable.Row
                    style={{ pointer: "cursor" }}
                    id={item.id}
                    key={item.id}
                    position={item.id}
                    selected={selectedResources.includes(item.id)}
                  >
                    {renderRow(fields, item)}
                  <IndexTable.Cell  key={"actions"} style={{ width: 100}}>
                    <Button onClick={() => {
                      createOrder(item.id)}}>Create order</Button>
                  </IndexTable.Cell>
                  </IndexTable.Row>
                ))}
              </IndexTable>
            )}
          </div>
        </Card.Section>
      </Card>
      {meta && (
        <div
          style={{
            display: "flex",
            padding: "20px 0",
            justifyContent: "center"
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
};
