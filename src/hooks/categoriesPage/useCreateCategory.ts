import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "../../api/requests/categories.ts";
import { apolloCategoriesClient } from "../../api";
import { toast } from "react-toastify";

export const useCreateCategory = () => {
    const [createCategoryMutation, { loading }] = useMutation(CREATE_CATEGORY, {
        client: apolloCategoriesClient,
        onError: (error) => {
            toast.error("Failed to create category");
            console.error(error);
        }
    });

    const createCategory = async ({ name, description }) => {
        const result = await createCategoryMutation({
            variables: {
                data: { name, description }
            }
        });
        return result.data?.create;
    };

    return { createCategory, loading };
};
