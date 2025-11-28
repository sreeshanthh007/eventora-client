import { User, Mail, Phone, Edit } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import type { RootState } from "@/store/store";
import { Button } from "@/components/pages/ui/button";
import { Card } from "@/components/pages/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/pages/ui/dialog";
import { Input } from "@/components/pages/ui/input";
import { Label } from "@/components/pages/ui/label";
import { profileValidateSchema } from "@/utils/validations/profile.validatator";

interface ContactInfoCardProps {
  onUpdateClient?: (updatedClient: { name: string; phone: string }) => void;
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ onUpdateClient }) => {
  // Get client data directly from Redux store
  const client = useSelector((state: RootState) => state.client.client);
  
  const [isOpen, setIsOpen] = useState(false);

  const handleEditDetails = (values: { name: string; phone: string }) => {
    const updatedClient = {
      name: values.name,
      phone: values.phone,
    };
    
    if (onUpdateClient) {
      onUpdateClient(updatedClient);
    }
    

    setIsOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: client?.name || "",
      phone: client?.phone || "",
    },
    validationSchema: profileValidateSchema,
    onSubmit: handleEditDetails,
    enableReinitialize: true, // This ensures formik updates when client data changes
  });

  if (!client) {
    return null; // or some loading state
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Contact Information</DialogTitle>
            </DialogHeader>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...formik.getFieldProps("name")}
                  placeholder="Enter full name"
                  className="h-12 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...formik.getFieldProps("phone")}
                  placeholder="Enter phone number"
                  className="h-12 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-sm text-red-500">{formik.errors.phone}</p>
                )}
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    formik.resetForm();
                    setIsOpen(false);
                  }}
                  className="px-5 py-2.5 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Full Name</p>
            <p className="text-gray-900 font-medium">{client.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
            <Mail className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email Address</p>
            <p className="text-gray-900 font-medium">{client.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
            <Phone className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Phone Number</p>
            <p className="text-gray-900 font-medium">{client.phone}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};