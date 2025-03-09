"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import fielUpload from "@/public/assets/icons/upload.svg";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export default function FileUploader({ files, onChange }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="file-upload"
          width={1000}
          height={1000}
          className="max-h-[400px] overflow-hidden object-fill"
        />
      ) : (
        <>
          <Image src={fielUpload} width={40} height={40} alt="upload" />
          <div className="file_upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>
            <p>SVG, PNG, JPG or Gif(max 800 * 400)</p>
          </div>
        </>
      )}
    </div>
  );
}
