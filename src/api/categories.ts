import {gql} from "@apollo/client";

export const GET_CATEGORIES = gql`
	query getList($data: GetCategoriesListDto!) {
		getList(data: $data) {
			data {
				id
				name
				description
			}
			pagination {
				nextOffset
				nextPage
				totalCount
			}
		}
	}
`;