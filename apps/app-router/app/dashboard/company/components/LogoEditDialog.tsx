import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, RotateCw, ZoomIn, ZoomOut, Trash2 } from "lucide-react";
import Image from "next/image";

interface LogoEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentLogo: string | null;
  onSave: (logo: string) => void;
}

export function LogoEditDialog({ isOpen, onClose, currentLogo, onSave }: LogoEditDialogProps) {
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewLogo(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Company Logo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-center">
            <div
              className={`relative w-48 h-48 border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed'} rounded-lg flex items-center justify-center transition-colors`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {(previewLogo || currentLogo) ? (
                <div className="relative w-full h-full">
                  <Image
                    src={previewLogo || currentLogo || ''}
                    alt="Company Logo"
                    fill
                    className="object-contain p-2 transition-transform"
                    style={{
                      transform: `rotate(${rotation}deg) scale(${zoom})`,
                    }}
                  />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/75 rounded-full p-1 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                      onClick={() => setRotation(r => r - 90)}
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                      onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                      onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                      onClick={() => {
                        setPreviewLogo(null);
                        setRotation(0);
                        setZoom(1);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Upload className="w-12 h-12 mx-auto mb-2" />
                  <span className="text-sm">Drop logo here or click to upload</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo-upload">Upload New Logo</Label>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full"
            />
            <p className="text-sm text-gray-500">
              Recommended size: 200x200px. Max file size: 2MB
              <br />
              Supported formats: PNG, JPG, SVG
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (previewLogo) {
                onSave(previewLogo);
                onClose();
              }
            }}
            disabled={!previewLogo}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 