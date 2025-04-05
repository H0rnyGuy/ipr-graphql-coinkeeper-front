import { useMutation } from "@apollo/client";
import { UPDATE_CATEGORY } from "../../api/requests/categories.ts";
import { apolloCategoriesClient } from "../../api";
import { toast } from "react-toastify";

export const useUpdateCategory = () => {
    const [updateCategoryMutation, { loading }] = useMutation(UPDATE_CATEGORY, {
        client: apolloCategoriesClient,
        onError: () => toast.error("Failed to update category"),
    });

    const updateCategory = async ({ categoryId, name, description }) => {
        const result = await updateCategoryMutation({
            variables: {
                data: {
                    categoryId,
                    name,
                    description,
                },
            },
        });
        toast.success("Category updated");
        return result.data?.update;
    };

    return { updateCategory, loading };
};
