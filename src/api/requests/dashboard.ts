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

export const GET_GRAPHIC = gql`
    query getTransactions($data: GetTransactionsDashboardDto!) {
      getTransactions(data: $data) {
        dashboardData {
          transactionDate
          totalIncome
          totalOutcome
        }
        totalData {
          totalIncome
          totalOutcome
          totalBalance
        }
      }
    }
`;