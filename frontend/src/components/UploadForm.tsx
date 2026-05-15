'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Loader2, FileSpreadsheet } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export function UploadForm({ onUpload, isLoading = false }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) onUpload(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'group relative flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-2xl transition-all duration-200 ease-in-out cursor-pointer',
        isDragActive ? 'border-indigo-500 bg-indigo-50/50' : 'border-zinc-200 bg-white hover:border-indigo-300 hover:bg-zinc-50',
        isLoading && 'opacity-60 cursor-not-allowed pointer-events-none'
      )}
      role="button"
      aria-label="Área de upload de arquivo CSV"
    >
      <input {...getInputProps()} />
      
      <div className="bg-zinc-100 p-4 rounded-full mb-4 group-hover:scale-105 transition-transform">
        {isLoading ? (
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
        ) : isDragActive ? (
          <FileSpreadsheet className="w-6 h-6 text-indigo-600 animate-bounce" />
        ) : (
          <UploadCloud className="w-6 h-6 text-zinc-500 group-hover:text-indigo-600" />
        )}
      </div>

      <h3 className="text-sm font-semibold text-zinc-900">
        {isLoading ? 'Processando transações...' : 'Clique ou arraste seu arquivo CSV'}
      </h3>
      <p className="text-xs text-zinc-500 mt-2">
        Apenas arquivos .csv (Máx. 5MB)
      </p>
    </div>
  );
}