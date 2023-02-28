import { useState } from "react";
import qs from "qs";
import { useAppQuery } from "../hooks";
import { DashboardAdminFormContact } from "../components/dashboard-admin-form-contact/DashboardAdminFormContact";
import { ContactDetail } from "../components/contact-detail/ContactDetail";
import { Page, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

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
    url: `/api/proposal?${qs.stringify(params)}`,
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  return (
    <Page fullWidth>
      {!showDetail && <TitleBar title="Proposal - Contact Form"/>}
      <Layout>
        <Layout.Section>
         {!showDetail ? <DashboardAdminFormContact
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
          /> : <ContactDetail content={content} setShowDetail={setShowDetail}/>}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
