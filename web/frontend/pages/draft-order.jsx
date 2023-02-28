import { Card,Tabs } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { ExampleAPI } from '../components/ExampleAPI';
import { useState,useCallback } from 'react';
import { useAppQuery } from "../hooks";
import qs from "qs";
import { Page, Layout } from "@shopify/polaris";

export default function PageName() {
  const [selected, setSelected] = useState(0);
  const [_isLoading, setIsLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [content, setContent] = useState({})
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    q: "",
    orderBy: "createdAt_DESC",
  });

  const { data, isLoading } = useAppQuery({
    url: `/api/kitchen?${qs.stringify(params)}`,
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'All',
      accessibilityLabel: 'All customers',
      component: <div/> ,
      panelID: 'all-customers-content-1',
    }
  ];
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              {tabs[selected].component}
            </Tabs>
          </Card> 
        </Layout.Section>
      </Layout>
    </Page>
  );
}
