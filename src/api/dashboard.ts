import {gql} from "@apollo/client";

export const GET_BALANCE = gql`
    query getTotal($data: GetTransactionsDashboardDto!) {
      getTotal(data: $data) {
          totalIncome
          totalOutcome
          totalBalance
      }
    }
`;