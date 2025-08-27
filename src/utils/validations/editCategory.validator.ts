import * as Yup from "yup"

export const editCategorySchema = Yup.object().shape({
      title: Yup.string()
        .required("Title is required")
        .test(
          "not-only-spaces",
          "Title cannot be empty or just spaces",
          (value) => value && value.trim().length > 0
        )
        .matches(/^[a-zA-Z\s]+$/, "Category name should only contain letters")
        .min(2, "Title should be at least two characters")
        .max(20, "Title should not exceed 20 characters"),
})