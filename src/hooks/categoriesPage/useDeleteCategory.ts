import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY } from "../../api/categories";
import { toast } from "react-toastify";
import { apolloCategoriesClient } from "../../api";

export const useDeleteCategory = () => {
    const [deleteCategoryMutation, { loading }] = useMutation(DELETE_CATEGORY, {
        client: apolloCategoriesClient,
        onError: () => toast.error("Failed to delete category"),
    });

    const deleteCategory = async (categoryId) => {
        const result = await deleteCategoryMutation({
            variables: {
                data: { id: categoryId },
            },
        });
        return result.data?.delete?.success;
    };

    return { deleteCategory, loading };
};
