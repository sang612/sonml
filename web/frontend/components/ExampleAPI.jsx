import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMemo } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { Button } from "@mui/material";

export function ExampleAPI() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();

  const { data: dataProposal } = useAppQuery({
    url: "/api/proposal",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  console.log("dataProposal:", dataProposal);

  const { data } = useAppQuery({
    url: "/api/kitchen",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  console.log("data:", data);

  const createOrder = async (id) => {
    try {
      const rs = await fetch(`/api/kitchen/${id}`, {
        method: "POST",
      });

      console.log("rs:", await rs.json());
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>お客様区分</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>お名前</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>メールアドレス</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>電話番号</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Files</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.payload?.data.map((row) => (
              <TableRow
                key={row.customerType}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>
                  {row.files.map((file) => {
                    if (file?.mimetype?.startsWith("image")) {
                      return (
                        <img
                          src={`/api/${file.path}`}
                          width="50px"
                          height="50px"
                        />
                      );
                    }

                    return "";
                  })}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  <Button onClick={() => createOrder(row._id)}>
                    Create order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
