import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import Loader from '../Notfications/Loader';
import { uploadImageservice } from '../../Redux/Apis/imageUploadService';

const Uploader = ({ setImageUrl }) => {
  const [loading, setLoading] = useState(false);

  // uploadfile
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = new FormData();
      file.append('file', acceptedFiles[0]);
      const data = await uploadImageservice(file, setLoading);
      setImageUrl(data);
      console.log(data);
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
    });
  return (
    <div className="w-full text-center flex-colo gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-border bg-dry border-dash rounded-md">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 py-8 w-full border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          <p>Drag your image here</p>
          <em className="text-xs text-border">
            {isDragActive
              ? 'Drop it like it is hot'
              : isDragReject
              ? 'Unsupported file type....'
              : 'only .jpg and .png are supported'}
            (only .jpg and .png files will be accepted)
          </em>
        </div>
      )}
    </div>
  );
};

export default Uploader;
