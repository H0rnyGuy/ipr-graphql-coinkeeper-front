import {gql} from "@apollo/client";

export const GET_CATEGORIES = gql`
	query getList($data: GetCategoriesListDto!) {
		getList(data: $data) {
			data {
                id
                userId
                name
                description
                defaultCategoryId
                type
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