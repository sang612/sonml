import {
  Page,
  Card,
  TextField,
  Icon,
  Button,
  Thumbnail,
  Banner,
  Link,
} from "@shopify/polaris";
import React from 'react';

export const CardReason = () => {
  return (
    <div>
    <Card title="編集の理由" sectioned>
    <TextField />
    <p style={{ color: "#6d7175" }}>あなたと他のスタッフだけこの理由を閲覧できます。</p>
      </Card>
    </div>
  );
}