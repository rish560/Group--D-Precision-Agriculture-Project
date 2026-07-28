import { useState, useRef } from 'react';

export const CameraUpload = ({ onChange }) => {
  const [preview, setPreview] = useState('');
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      onChange && onChange({ file, dataUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const onSelect = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const openCamera = () => {
    inputRef.current?.click();
  };

  const remove = () => {
    setPreview('');
    onChange && onChange(null);
  };

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onSelect} />
      {preview ? (
        <div className="space-y-2">
          <img src={preview} alt="preview" className="h-44 w-full rounded-2xl object-cover" />
          <div className="flex gap-2">
            <button type="button" className="rounded-2xl border px-3 py-2" onClick={openCamera}>Retake</button>
            <button type="button" className="rounded-2xl border px-3 py-2" onClick={remove}>Remove</button>
          </div>
        </div>
      ) : (
        <div>
          <button type="button" className="rounded-2xl border border-dashed px-4 py-6 w-full text-sm" onClick={openCamera}>Open camera / upload</button>
        </div>
      )}
    </div>
  );
};

export default CameraUpload;
