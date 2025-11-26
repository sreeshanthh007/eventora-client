import type React from "react";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { Input } from "@/components/pages/ui/input";
import { Textarea } from "@/components/pages/ui/textarea";
import { Button } from "@/components/pages/ui/button";
import { Badge } from "@/components/pages/ui/badge";
import { X, ImagePlus, Upload } from "lucide-react";
import { useFormik } from "formik";
import { workSampleSchema } from "@/utils/validations/work-sample.validator";
import { UseGetWorksampleData } from "@/hooks/vendor/worksample/UseGetWorksampleData";
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage";
import { WorkSampleFormSkeleton } from "@/components/common/skeletons/WorkSampleFormSkeleton";
import ImageCropper from "@/utils/helpers/ImageCropper";

type ImageItem = {
  id: string;
  file?: File;
  url: string;
};

type WorkSampleFormProps = {
  onSubmit: (values: { title: string; description: string; images: File[] }) => void;
  editSubmit: (worksampleId: string, values: { title: string; description: string; images: (string | File)[] }) => void;
};

export function WorkSampleForm({ onSubmit, editSubmit }: WorkSampleFormProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data, isLoading } = UseGetWorksampleData();
  const worksample = data?.data;

  const isEditing = !!worksample;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: workSampleSchema,
    onSubmit: (values) => {
      isEditing ? handleEditSubmit(values) : handleSubmit(values);
    },
  });

  // Load existing data when editing
  useEffect(() => {
    if (worksample) {
      formik.setValues({
        title: worksample.title || "",
        description: worksample.description || "",
      });

      if (worksample.images && worksample.images.length > 0) {
        const fetchedImages: ImageItem[] = worksample.images.map((publicId: string) => ({
          id: publicId,
          url: getCloudinaryImageUrl(publicId),
        }));
        setImages(fetchedImages);
      }
    }
  }, [worksample]);

  // Open cropper when a new file is selected
  const openCropper = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageToCrop(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const onFilesSelected = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Only process the first file for now (or loop for multiple)
    const file = files[0];
    if (!file.type.startsWith("image/")) return;

    openCropper(file);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  // Called from ImageCropper when user clicks "Apply Changes"
  const handleCropComplete = useCallback((croppedFile: File | null) => {
    if (!croppedFile) {
      setShowCropper(false);
      return;
    }

    const url = URL.createObjectURL(croppedFile);
    const newImage: ImageItem = {
      id: `${croppedFile.name}-${croppedFile.size}-${Date.now()}-${crypto.randomUUID()}`,
      file: croppedFile,
      url,
    };

    setImages((prev) => [...prev, newImage]);
    setShowCropper(false);
    setImageToCrop("");
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const removing = prev.find((i) => i.id === id);
      if (removing?.file) URL.revokeObjectURL(removing.url);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onFilesSelected(e.dataTransfer.files);
    },
    [onFilesSelected]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const previewCount = useMemo(() => images.length, [images]);

  const handleSubmit = (values: { title: string; description: string }) => {
    const newFiles = images.filter((img) => img.file).map((img) => img.file!);
    if (newFiles.length === 0 && images.length === 0) {
      alert("Please add at least one image");
      return;
    }
    onSubmit({ ...values, images: newFiles });
  };

  const handleEditSubmit = (values: { title: string; description: string }) => {
    const newFiles = images.filter((img) => img.file).map((img) => img.file!);
    const existingImageIds = images.filter((img) => !img.file).map((img) => img.id);

    editSubmit(worksample._id, {
      ...values,
      images: [...existingImageIds, ...newFiles],
    });
  };

  if (isLoading) return <WorkSampleFormSkeleton />;

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">Work Sample</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              {/* Title & Description - unchanged */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-foreground">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Wedding Photography - Summer Collection"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.title && formik.errors.title ? "border-red-500" : ""}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-xs text-red-500">{formik.errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-foreground">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your work, style, and what makes this sample special."
                  className={`min-h-28 ${formik.touched.description && formik.errors.description ? "border-red-500" : ""}`}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-xs text-red-500">{formik.errors.description}</p>
                )}
              </div>

              {/* Image Upload Area */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Images</label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="rounded-md border border-dashed p-6 bg-muted/30 cursor-pointer hover:bg-muted/40 transition"
                >
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop images here, or click to upload
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onFilesSelected(e.target.files)}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => inputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Image
                      </Button>
                      <Badge variant="outline">{previewCount} image{previewCount !== 1 ? "s" : ""}</Badge>
                    </div>
                  </div>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {images.map((img) => (
                      <div key={img.id} className="relative group rounded-lg overflow-hidden border bg-card shadow-sm">
                        <img
                          src={img.url}
                          alt="Preview"
                          className="h-32 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={formik.isSubmitting || images.length === 0}
                >
                  {formik.isSubmitting
                    ? "Saving..."
                    : isEditing
                    ? "Update Work Sample"
                    : "Save Work Sample"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Image Cropper Modal */}
      {showCropper && imageToCrop && (
        <ImageCropper
          image={imageToCrop}
          onCropComplete={handleCropComplete}
          aspect={4 / 3}
          showCropper={setShowCropper}
        />
      )}
    </>
  );
}