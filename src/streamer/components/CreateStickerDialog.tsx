import React, { FC, useState } from "react";
import axios from "axios";
import { CreateStickerDialogProps } from "../interfaces/CreateStickerDialogProps";
import "../styles/CreateStickerDialog.css";

export const CreateStickerDialog: FC<CreateStickerDialogProps> = ({
  visible,
  onClose
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [price, setPrice] = useState<string>("");
  const [stickerName, setStickerName] = useState<string>("");
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const userId = localStorage.getItem("userId");

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (uploadedFile: File) => {
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    } else {
      alert("Please upload an image file.");
    }
  };

  const handleSubmit = async () => {
    if (!file || !price || !stickerName || !userId || !height || !width) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("price_per_second", price);
    formData.append("sticker_name", stickerName);
    formData.append("user_id", userId);
    formData.append("height", height.toString());
    formData.append("width", width.toString());

    console.log("formData", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/sticker/upload",
        formData
      );

      if (response.status !== 200) {
        throw new Error("Failed to create sticker");
      }

      alert("Sticker created successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to create sticker", error);
      alert("Failed to upload sticker.");
    }
  };

  if (!visible) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <h3>Create sticker</h3>
          <button className="dialog-close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div
          className="upload-area"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <p>Drag & Drop or Click to Upload</p>
          )}
          <input
            id="fileInput"
            type="file"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0] as File)}
          />
        </div>

        <div className="dialog-body">
          <input
            type="text"
            placeholder="Sticker name"
            value={stickerName}
            onChange={(e) => setStickerName(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price per second"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="Width"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
          />
          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};
