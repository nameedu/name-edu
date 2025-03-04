
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Cloud, File, X, FileImage, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
  onRemoveFile: (index: number) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  maxSize?: number;
}

const FileUploadZone = ({ 
  onFilesSelected, 
  selectedFiles, 
  onRemoveFile,
  maxFiles = 5,
  accept = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'application/pdf': ['.pdf']
  },
  maxSize = 5 * 1024 * 1024 // 5MB
}: FileUploadZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Check if adding these files would exceed maxFiles
    if (selectedFiles.length + acceptedFiles.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`);
      // Only add files up to the limit
      const availableSlots = maxFiles - selectedFiles.length;
      if (availableSlots > 0) {
        onFilesSelected(acceptedFiles.slice(0, availableSlots));
      }
      return;
    }
    
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected, selectedFiles.length, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: true
  });

  const getFileIcon = (file: File) => {
    if (file.type.includes('image')) {
      return <FileImage className="h-4 w-4" />;
    } else if (file.type.includes('pdf')) {
      return <FileText className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  const getFilePreview = (file: File, index: number) => {
    if (file.type.includes('image')) {
      return (
        <div className="relative w-16 h-16 mr-2">
          <img 
            src={URL.createObjectURL(file)} 
            alt={file.name} 
            className="w-full h-full object-cover rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="h-5 w-5 absolute -top-2 -right-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFile(index);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2 p-2 bg-secondary rounded-md">
        {getFileIcon(file)}
        <span className="text-sm truncate flex-1">{file.name}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onRemoveFile(index)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <Cloud className="h-6 w-6" />
          <p className="text-center">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop files here, or click to select"}
          </p>
          <p className="text-xs">Supported formats: PDF, JPEG, PNG (Max: {maxFiles} files, {maxSize/1024/1024}MB each)</p>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Selected Files ({selectedFiles.length}/{maxFiles})</div>
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index}>
                {getFilePreview(file, index)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
