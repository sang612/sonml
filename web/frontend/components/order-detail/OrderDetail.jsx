import {
  Card,
  Thumbnail,
  Icon,
  Stack,
  DisplayText,
  Button,
  TopBar,
  Link,
  List,
  Page,
  Popover,
  ActionList,
  Badge,
  TextField,
  Toast,
  Frame,
} from "@shopify/polaris";
import {
  ImageMajor,
  CircleTickMajor,
  MobileHorizontalDotsMajor,
  ClipboardMinor,
  ImportMinor,
  ExportMinor,
  CancelMinor,
  DuplicateMinor,
  ArchiveMinor,
  PrintMinor,
  ViewMinor,
} from "@shopify/polaris-icons";
import styles from "./OrderDetail.module.css";
import clsx from "clsx";
import { useState } from "react";
import { useCallback } from "react";
import { OrderProduct } from "../order-product/OrderProduct";
import { QuoteItem } from "../order-product/QuoteItem";
import { UnfulilledIcon } from "./UnfulilledIcon";

export const OrderDetail = () => {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const activator = (
    <Button onClick={toggleActive} disclosure>
      その他の操作
    </Button>
  );
  const [value, setValue] = useState("");
  const handleChange = useCallback((newValue) => setValue(newValue), []);
  const [isToastActive, setIsToastActive] = useState(false);
  const toggleActiveToast = useCallback(
    () => setIsToastActive((isToastActive) => !isToastActive),
    []
  );
  const toastMarkup = isToastActive ? (
    <Toast
      content="Copied to clipboard"
      onDismiss={() => setIsToastActive(false)}
      duration={2000}
    />
  ) : null;
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    toggleActiveToast();
  };

  return (
    <Frame>
      <Page
        breadcrumbs={[{ content: "Kitchen", url: "/kitchen" }]}
        title="#1002"
        titleMetadata={
          <div className={styles.badgeGroup}>
            <Badge progress="incomplete" status="warning">
              保留中の決済
            </Badge>
            <Badge progress="incomplete" status="attention">
              未発送
            </Badge>
          </div>
        }
        subtitle="2022年12月6日 11:50 下書き注文のから"
        secondaryActions={[
          { content: "編集" },
          {
            content: (
              <Popover
                active={active}
                activator={activator}
                onClose={toggleActive}
              >
                <ActionList
                  actionRole="menuitem"
                  items={[
                    { content: "Duplicate", icon: DuplicateMinor },
                    { content: "Cancel order", icon: CancelMinor },
                    { content: "Archive", icon: ArchiveMinor },
                    { content: "Print order page", icon: PrintMinor },
                    { content: "Print packing slips", icon: PrintMinor },
                    { content: "View order status page", icon: ViewMinor },
                  ]}
                />
              </Popover>
            ),
          },
          {},
        ]}
        pagination={{
          hasPrevious: false,
          hasNext: false,
        }}
      >
        <section className={styles.section}>
          <div>
            <Card>
              <Card.Section>
                <OrderProduct quantity={1} name="テスト 01" price={100} />
                <OrderProduct quantity={1} name="テスト 02" price={200} />
                <Card.Subsection>配送不要。</Card.Subsection>
              </Card.Section>
            </Card>
            <Card
              title={
                <Stack alignment="center">
                  <Icon source={UnfulilledIcon} color="warning" backdrop />
                  <DisplayText size="small">
                    <h3 className={styles.fontBold}>保留中</h3>
                  </DisplayText>
                </Stack>
              }
            >
              <Card.Section>
                <Card.Subsection>
                  <div className={styles.rowContainer}>
                    <QuoteItem
                      firstText="ディスカウント"
                      secondText="セット価格のため"
                      price={100}
                      minus
                    />
                    <QuoteItem
                      firstText="小計"
                      secondText="2個のアイテム"
                      price={200}
                    />
                    <QuoteItem firstText="税" secondText="10%のCT" price={20} />
                    <QuoteItem
                      firstText="合計"
                      secondText=""
                      price={220}
                      bold
                    />
                  </div>
                </Card.Subsection>
                <Card.Subsection>
                  <Stack distribution="trailing">
                    <div style={{ backgroundColor: "#ef8632", color: "white" }}>
                      <Button monochrome outline>
                        見積書を送信
                      </Button>
                    </div>
                  </Stack>
                </Card.Subsection>
              </Card.Section>
            </Card>
          </div>
          <div className={styles.side}>
            <Card title="メモ" actions={[{ content: "編集" }]}>
              <Card.Section>
                <Card.Subsection>
                  <p>
                    メモテストテキスト、 テストテキストテ
                    ストテキストテストテキストテストテキ スト。
                  </p>
                  <p> テストテキスト。s</p>
                </Card.Subsection>
              </Card.Section>
            </Card>
            <Card
              title="顧客"
              actions={[
                {
                  content: (
                    <div style={{ color: "grey" }}>
                      <Button plain icon={MobileHorizontalDotsMajor}></Button>
                    </div>
                  ),
                },
              ]}
            >
              <Card.Section>
                <Card.Subsection>
                  <Link>山田太郎</Link>
                  <h3>注文はありません</h3>
                </Card.Subsection>
              </Card.Section>
              <Card.Section>
                <Card.Subsection>
                  <h3 className={styles.fontBold}>連絡先情報</h3>
                  <div className={styles.sideRow}>
                    <Link
                      removeUnderline
                      children={
                        <span className={styles.breakWord}>
                          shu.yoshimori+test@evodevo.design
                        </span>
                      }
                    ></Link>
                    <div
                      className={clsx(styles.hFull, styles.pointer)}
                      onClick={() =>
                        copyToClipboard("shu.yoshimori+test@evodevo.design")
                      }
                    >
                      <Icon source={ClipboardMinor} color="base" />
                    </div>
                    {toastMarkup}
                  </div>
                </Card.Subsection>
              </Card.Section>

              <Card.Section>
                <Card.Subsection>
                  <h3 className={styles.fontBold}>配送先住所</h3>
                  <div className={styles.sideRow}>
                    <div>
                      <h3>日本 〒530-0043 </h3>
                      <h3>大阪府 大阪市</h3>
                      <h3>北区天満</h3>
                      <h3>EvoDevoDesign</h3>
                      <h3>山田 太郎様 </h3>
                      <h3>+810012345678</h3>
                    </div>
                    <div
                      className={clsx(styles.hFull, styles.pointer)}
                      onClick={() => copyToClipboard("日本 〒530-0043 ")}
                    >
                      <Icon source={ClipboardMinor} color="base" />
                    </div>
                  </div>
                </Card.Subsection>
              </Card.Section>
              <Card.Section>
                <Card.Subsection>
                  <h3 className={styles.fontBold}>請求先住所</h3>
                  <div className={styles.sideRow}>
                    <p className={styles.textGray}>配送先住所と同じ</p>
                  </div>
                </Card.Subsection>
              </Card.Section>
            </Card>

            <Card title="コンバージョンの概要">
              <Card.Section>
                <Card.Subsection>
                  <p>この注文で利用できるコンバージョン の詳細はありません。</p>
                  <div className={styles.textContainer}>
                    <Link>詳細情報</Link>
                  </div>
                </Card.Subsection>
              </Card.Section>
            </Card>

            <Card title="不正解析">
              <Card.Section>
                <Card.Subsection>
                  <div className={styles.textGray}>
                    <List type="bullet">
                      <List.Item>
                        セキュリティコード (CVV) が利 用できません
                      </List.Item>
                      <List.Item>
                        請求先住所またはクレジットカー
                        ドの住所が利用できませんでした
                      </List.Item>
                    </List>
                  </div>
                </Card.Subsection>
              </Card.Section>
              <Card.Section>
                <Card.Subsection>
                  <Link>完全な分析を確認する</Link>
                </Card.Subsection>
              </Card.Section>
            </Card>

            <Card title="タグ" actions={[{ content: "管理" }]}>
              <Card.Section>
                <Card.Subsection>
                  <TextField
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="タグを見つけるか作成する"
                  />
                </Card.Subsection>
              </Card.Section>
            </Card>
          </div>
        </section>
      </Page>
    </Frame>
  );
};
