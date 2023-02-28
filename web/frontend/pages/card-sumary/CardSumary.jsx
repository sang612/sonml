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

export const CardSumary = () => {
  return (
    <div>
    <Card title="サマリー">
    <Card.Section>
      <p>変更行われませんでした。</p>
    </Card.Section>
    <Card.Section>
      <Button disabled fullWidth>請求書を送信する</Button>
    </Card.Section>
  </Card>
    </div>
  );
}