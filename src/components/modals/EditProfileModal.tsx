
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/pages/ui/dialog";
import { Button } from "@/components/pages/ui/button";
import { Input } from "@/components/pages/ui/input";
import { Label } from "@/components/pages/ui/label";
import { Textarea } from "@/components/pages/ui/textarea";
import { Loader2 } from "lucide-react";
import { useFormik } from "formik";
import { vendorProfileSchema } from "@/utils/validations/vendor.profile.validator";

export interface EditProfileData {
  name: string;
  phone: string;
  about: string;
  place: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditProfileData) => void;
  initialData: EditProfileData;
  isLoading?: boolean;
}

export function EditProfileModal({ isOpen, onClose, onSave, initialData, isLoading = false }: EditProfileModalProps) {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: vendorProfileSchema,
    onSubmit: (values) => {
      onSave(values);
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your vendor profile information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...formik.getFieldProps("name")}
              placeholder="Enter your name"
              className="h-12 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              {...formik.getFieldProps("phone")}
              placeholder="Enter your phone number"
              className="h-12 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm text-red-500">{formik.errors.phone}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="place">Location</Label>
            <Input
              id="place"
              {...formik.getFieldProps("place")}
              placeholder="Enter your location"
              className="h-12 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl"
            />
            {formik.touched.place && formik.errors.place && (
              <p className="text-sm text-red-500">{formik.errors.place}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">About</Label>
            <Textarea
              id="bio"
              {...formik.getFieldProps("about")}
              placeholder="Tell us about yourself and your services"
              rows={4}
              className="bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl"
            />
            {formik.touched.about && formik.errors.about && (
              <p className="text-sm text-red-500">{formik.errors.about}</p>
            )}
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="px-5 py-2.5 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formik.isValid || !formik.dirty}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
