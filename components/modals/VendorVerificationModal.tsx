
        import type React from "react"
        import { useState, useCallback } from "react"
        import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../pages/ui/dialog"
        import { Button } from "../pages/ui/button"
        import { Input } from "../pages/ui/input"
        import { Label } from "../pages/ui/label"
        import { Card, CardContent, CardHeader, CardTitle } from "../pages/ui/card"
        import { Upload, CheckCircle } from "lucide-react"
        import ImageCropper from "../../utils/helpers/ImageCropper"

        interface VerificationModalProps {
        isOpen: boolean
        onClose: () => void
        setFrontIdImage:React.Dispatch<React.SetStateAction<File | null>>
        setBackIdImage:React.Dispatch<React.SetStateAction<File | null>>
        frontImage:File
        backImage:File
            
        }

        const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose,setBackIdImage,setFrontIdImage,frontImage,backImage }) => {
        const [imageToCrop, setImageToCrop] = useState<string | null>(null)
        const [currentCropTarget, setCurrentCropTarget] = useState<"front" | "back" | null>(null)
        const [showCropper, setShowCropper] = useState(false)

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, target: "front" | "back") => {
            const file = event.target.files?.[0]
            if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageToCrop(reader.result as string)
                setCurrentCropTarget(target)
                setShowCropper(true)
            }
            reader.readAsDataURL(file)
            }
        }

        const handleCropComplete = useCallback(
            (croppedFile: File | null) => {
            if (croppedFile) {
                if (currentCropTarget === "front") {
                setFrontIdImage(croppedFile)
                } else if (currentCropTarget === "back") {
                setBackIdImage(croppedFile)
                }
            }
            setImageToCrop(null)
            setCurrentCropTarget(null)
            setShowCropper(false)
            },
            [currentCropTarget],
        )

        const handleSubmit = () => {
            
            console.log("Submitting ID Proof:")
           
        }

        const isSubmitDisabled = !frontImage || !backImage

        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-6">
                <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800">Verification</DialogTitle>
                <DialogDescription className="text-gray-600">
                    Please upload the front and back of your ID proof for verification. Ensure the images are clear and all
                    details are visible.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer relative">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-gray-700">Front of ID</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center w-full">
                        <Label
                        htmlFor="front-id-upload"
                        className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
                        >
                        {frontImage ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src={URL.createObjectURL(frontImage) || "/placeholder.svg"}
                                alt="Front ID Preview"
                                className="max-h-full max-w-full object-contain rounded-md"
                            />
                            <CheckCircle className="absolute top-2 right-2 text-green-500 h-6 w-6" />
                            </div>
                        ) : (
                            <>
                            <Upload className="h-8 w-8 text-gray-500 mb-2" />
                            <span className="text-sm text-gray-500">Click to upload or drag & drop</span>
                            </>
                        )}
                        </Label>
                        <Input
                        id="front-id-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "front")}
                        className="sr-only"
                        />  
                    </CardContent>
                    </Card>

                    <Card className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer relative">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-gray-700">Back of ID</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center w-full">
                        <Label
                        htmlFor="back-id-upload"
                        className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
                        >
                        {backImage ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src={URL.createObjectURL(backImage) || "/placeholder.svg"}
                                alt="Back ID Preview"
                                className="max-h-full max-w-full object-contain rounded-md"
                            />
                            <CheckCircle className="absolute top-2 right-2 text-green-500 h-6 w-6" />
                            </div>
                        ) : (
                            <>
                            <Upload className="h-8 w-8 text-gray-500 mb-2" />
                            <span className="text-sm text-gray-500">Click to upload or drag & drop</span>
                            </>
                        )}
                        </Label>
                        <Input
                        id="back-id-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "back")}
                        className="sr-only"
                        />
                    </CardContent>
                    </Card>
                </div>
                </div>
                <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
                    Submit for Verification
                </Button>
                </div>

                {showCropper && imageToCrop && (
                <ImageCropper
                    image={imageToCrop}
                    onCropComplete={handleCropComplete}
                    showCropper={setShowCropper}
                    aspect={4 / 3} 
                    />
                )}
            </DialogContent>
            </Dialog>
        )
        }

        export default VerificationModal
