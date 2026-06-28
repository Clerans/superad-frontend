import React, { useState, useRef } from 'react';
import { UploadCloud, X, Trash2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { ProjectImage } from '@/types/portfolio';
import { portfolioApi } from '@/api/portfolioApi';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/ui/button';

interface ImageUploaderProps {
  projectId: string;
  existingImages?: ProjectImage[];
  onImagesChange?: () => void;
}

export default function ImageUploader({ projectId, existingImages = [], onImagesChange }: ImageUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const fileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files: File[]) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const filteredFiles: File[] = [];

    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported image format (JPEG, PNG, WEBP only)`);
        continue;
      }
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds the 10MB limit`);
        continue;
      }
      filteredFiles.push(file);
    }

    if (selectedFiles.length + filteredFiles.length > 10) {
      toast.warning('You can upload a maximum of 10 files at a time');
      setSelectedFiles((prev) => [...prev, ...filteredFiles.slice(0, 10 - prev.length)]);
    } else {
      setSelectedFiles((prev) => [...prev, ...filteredFiles]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    const toastId = toast.loading(`Uploading ${selectedFiles.length} images to Cloudinary...`);

    try {
      await portfolioApi.uploadImages(projectId, selectedFiles);
      toast.success('Images uploaded successfully', { id: toastId });
      setSelectedFiles([]);
      if (onImagesChange) onImagesChange();
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload images', { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteExisting = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    const toastId = toast.loading('Deleting image...');
    try {
      await portfolioApi.deleteImage(imageId);
      toast.success('Image deleted successfully', { id: toastId });
      if (onImagesChange) onImagesChange();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete image', { id: toastId });
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div>
        <label className="block text-sm font-semibold text-secondary mb-2">Upload Project Images</label>
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-dashed border-4 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-accent/60 hover:border-primary hover:bg-accent/5'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={fileSelected}
            multiple
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
          />
          <UploadCloud className={`w-12 h-12 mb-3 transition-colors ${dragActive ? 'text-primary' : 'text-accent'}`} />
          <p className="text-secondary font-bold text-center">
            Drag & drop images here or <span className="text-primary hover:underline">click to browse</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1.5 text-center">
            Supports JPEG, PNG, WEBP (Max 10MB each, up to 10 files)
          </p>
        </div>
      </div>

      {/* Selected files previews */}
      {selectedFiles.length > 0 && (
        <div className="bg-gray-50 border border-accent/20 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-secondary">
              Queue ({selectedFiles.length} image{selectedFiles.length > 1 ? 's' : ''})
            </h4>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedFiles([])}
              className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer border-red-200 hover:border-red-400"
            >
              Clear Queue
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedFiles.map((file, idx) => {
              const url = URL.createObjectURL(file);
              return (
                <div key={idx} className="relative flex items-center gap-3 bg-white p-2 rounded-xl border border-accent/35 shadow-sm">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 bg-gray-50">
                    <img src={url} alt={file.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-secondary truncate">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground">{formatSize(file.size)}</p>
                  </div>
                  <button
                    onClick={() => removeSelectedFile(idx)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 cursor-pointer"
                    title="Remove from queue"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-primary hover:bg-secondary text-white font-bold px-6 py-2.5 rounded-xl border-2 border-primary hover:border-secondary transition-all cursor-pointer flex items-center gap-2 shadow-md"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>Upload {selectedFiles.length} Image{selectedFiles.length > 1 ? 's' : ''}</>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Existing Images Gallery */}
      {existingImages.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-secondary">Uploaded Project Images</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {existingImages.map((img) => (
              <div
                key={img.id}
                className="group relative h-28 rounded-xl overflow-hidden border-2 border-accent/40 bg-gray-50 shadow-sm transition-all hover:border-primary"
              >
                <ImageWithFallback src={img.image_url} alt="Project asset" className="w-full h-full object-cover" />

                {/* Primary tag */}
                {img.is_primary && (
                  <div className="absolute top-1.5 left-1.5 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-white/30 flex items-center gap-1 select-none">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Primary
                  </div>
                )}

                {/* Hover Delete Action Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDeleteExisting(img.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
