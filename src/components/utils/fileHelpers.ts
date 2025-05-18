import { FileText, FileSpreadsheet, Presentation as FilePresentation, FileCheck } from 'lucide-react';
import { Resource } from '../types/res';

export const getFormatIcon = (format: string) => {
  switch (format.toLowerCase()) {
    case 'pdf':
      return FileText;
    case 'xlsx':
    case 'xls':
      return FileSpreadsheet;
    case 'pptx':
    case 'ppt':
      return FilePresentation;
    default:
      return FileCheck;
  }
};

export const handleDownload = (resource: Resource) => {
  if (!resource.fileData) return;

  const link = document.createElement('a');
  link.href = resource.fileData;
  link.download = `${resource.title}.${resource.formats?.[0] || 'pdf'}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};