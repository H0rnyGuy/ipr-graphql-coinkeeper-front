import {gql} from "@apollo/client";

export const GET_TRANSACTIONS = gql`
    query getList($data: GetTransactionsListDto!) {
      getList(data: $data) {
        data {
            id
            userId
            categoryId
            description
            type
            amount
            transactionDate
            createdAt
            updatedAt
        }
            pagination {
            nextOffset
            nextPage
            totalCount
        }
      }
    }
`;

export const CREATE_TRANSACTION = gql`
    mutation create($data: CreateTransactionDto!) {
      create(data: $data) {
            id
            userId
            categoryId
            description
            type
            amount
            transactionDate
            createdAt
            updatedAt
      }
    }
`;
