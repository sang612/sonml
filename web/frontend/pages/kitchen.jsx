import { useState } from "react";
import qs from "qs";
import { useAppQuery } from "../hooks";
import { DashboardAdminFormKitchen } from "../components/dashboard-admin-form-kitchen/DashboardAdminFormKitchen";
import { KitchenDetail } from "../components/kitchen-detail/KitchenDetail";
import { Page, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { EstimateDetail } from "../components/estimate-detail/EstimateDetail";

export default function ProposalPage() {
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

  return (
    <Page fullWidth>
      {!showDetail && <TitleBar title="Kitchen - Kitchen Form" />}
      <TitleBar title="Dashboard Kitchen" />
      <Layout>
        <Layout.Section>
          {!showDetail ? <DashboardAdminFormKitchen
            showDetail={showDetail}
            setContent={setContent}
            setShowDetail={setShowDetail}
            isLoading={isLoading}
            data={data?.payload?.data}
            meta={data?.payload?.meta}
            onPage={(p) => {
              setParams((pre) => ({
                ...pre,
                page: p,
              }));
            }}
            onSearch={(q) => {
              setParams((pre) => ({
                ...pre,
                q,
              }));
            }}
          /> : content.estimateType === "estimate" ? (
            //Estimate detail
            <EstimateDetail content={content} setShowDetail={setShowDetail} />
          ) : (
            //Kitchen detail
            <KitchenDetail content={content} setShowDetail={setShowDetail} />
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
