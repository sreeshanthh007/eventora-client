    import * as Yup from "yup"

    const MAX_FILE_SIZE = 5 * 1024 * 1024 
    const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"]

    export const imageValidationSchema = Yup.mixed()
    .nullable()
    .test("fileRequired", "Image is required", (value) => {
        return value !== null && value !== undefined
    })
    .test("fileSize", "File too large. Max 5MB.", (value) => {
        if (!value) return true
        return (value as File).size <= MAX_FILE_SIZE
    })
    .test("fileType", "Unsupported file format. Only JPG, PNG, WEBP are allowed.", (value) => {
        if (!value) return true
        return ALLOWED_FILE_TYPES.includes((value as File).type)
    })

    export const requiredImageSchema = imageValidationSchema.required("Image is required")
