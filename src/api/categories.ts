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

export const CREATE_CATEGORY = gql`
	mutation create($data: CreateCategoryDto!) {
		create(data: $data) {
			id
			userId
			name
			description
			defaultCategoryId
			type
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_CATEGORY = gql`
	mutation update($data: UpdateCategoryDto!) {
		update(data: $data) {
			id
			userId
			name
			description
			defaultCategoryId
			type
			createdAt
			updatedAt
		}
	}
`;
