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

export const DELETE_TRANSACTION = gql`
    mutation delete($data: EntityByIdDto!) {
      delete(data: $data) {
        success
      }
    }
`;

export const UPDATE_TRANSACTION = gql`
    mutation update($data: UpdateTransactionDto!) {
      update(data: $data) {
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
