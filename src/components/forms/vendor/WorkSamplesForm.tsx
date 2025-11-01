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

type ImageItem = {
  id: string;
  file?: File; 
  url: string;
};

type WorkSampleFormProps = {
  onSubmit: (values: { title: string; description: string; images: File[] }) => void;
  editSubmit: (worksampleId:string,values: { title: string; description: string; images:  (string | File)[]; }) => void;
};

export function WorkSampleForm({ onSubmit,editSubmit }: WorkSampleFormProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data,  isLoading } = UseGetWorksampleData();

  const worksample = data?.data



  
  useEffect(() => {
    if (data) {
     
      formik.setValues({
        title: worksample.title || "",
        description: worksample.description || "",
      });

      if (worksample.images) {
        const fetchedImages: ImageItem[] = worksample.images.map((publicId: string) => ({
          id: publicId,
          url: getCloudinaryImageUrl(publicId),
        }));
        setImages(fetchedImages);
      }
    }
  }, [data]);

  
  const isEditing = worksample  ? true : false

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: workSampleSchema,
    onSubmit: (values) => {
      
    isEditing==true ?  handleEditSubmit(values) : handleSubmit(values) 
    },
  });

  const onFilesSelected = useCallback((files: FileList | null) => {
    if (!files) return;
    const newItems: ImageItem[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      newItems.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        url,
      });
    });
    setImages((prev) => [...prev, ...newItems]);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const removing = prev.find((i) => i.id === id);
      if (removing && removing.file) URL.revokeObjectURL(removing.url);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onFilesSelected(e.dataTransfer.files);
    },
    [onFilesSelected],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const previewCount = useMemo(() => images.length, [images]);

  const handleSubmit = (values: { title: string; description: string }) => {

    const uploadedImages = images.filter((img) => img.file).map((img) => img.file!);
    onSubmit({ ...values, images: uploadedImages });
  };

  const handleEditSubmit = (values:{title:string,description:string})=>{
    
  const newImages = images.filter((img) => img.file).map((img) => img.file!);


  const existingImages = images.filter((img) => !img.file).map((img) => img.id); 


  editSubmit(worksample._id, {
    ...values,
    images: [...existingImages, ...newImages],
  });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

 

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-lg">Work Sample</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
                aria-describedby="title-help"
                className={formik.touched.title && formik.errors.title ? "border-red-500" : ""}
              />
              <p id="title-help" className="text-xs text-muted-foreground">
                A short, descriptive title for your work sample.
              </p>
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
                aria-describedby="desc-help"
              />
              <p id="desc-help" className="text-xs text-muted-foreground">
                Provide context so viewers understand what they’re seeing.
              </p>
              {formik.touched.description && formik.errors.description && (
                <p className="text-xs text-red-500">{formik.errors.description}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Images</label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="rounded-md border border-dashed p-4 md:p-6 bg-muted/30"
                aria-label="Drop images here or use the upload button"
              >
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drag and drop images here, or click upload</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => onFilesSelected(e.target.files)}
                      aria-label="Upload images"
                    />
                    <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images
                    </Button>
                    <Badge variant="outline" className="rounded-md">
                      {previewCount} selected
                    </Badge>
                  </div>
                </div>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                  {images.map((img) => (
                    <div key={img.id} className="relative rounded-md overflow-hidden border bg-card">
                      <img
                        src={img.url || "/placeholder.svg"}
                        alt="Selected preview"
                        className="h-28 w-full object-cover"
                        crossOrigin="anonymous"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="absolute top-1 right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-background/90 border shadow-sm"
                        aria-label="Remove image"
                        title="Remove"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="pt-2">
             { worksample?.length > 0 ?
             <Button type="submit" className="w-full md:w-auto" disabled={formik.isSubmitting}>
                Save Work Sample
              </Button> 
           :  <Button type="submit"   className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4" disabled={formik.isSubmitting}>
                Edit Work Sample
              </Button> }
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}