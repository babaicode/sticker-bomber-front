import React, { FC, useState } from "react";
import axios from "axios";
import { CreateStickerDialogProps } from "../interfaces/CreateStickerDialogProps";
import styles from "../styles/CreateStickerDialog.module.css";
import { useTranslation } from "react-i18next";

export const CreateStickerDialog: FC<CreateStickerDialogProps> = ({
  visible,
  onClose
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [price, setPrice] = useState<string>("");
  const [stickerName, setStickerName] = useState<string>("");
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  const userId = localStorage.getItem("userId");

  const { t } = useTranslation();

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
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContainer}>
        <div className={styles.dialogHeader}>
          <h3>{t("create-sticker")}</h3>
          <button className={styles.dialogCloseButton} onClick={onClose}>
            &times;
          </button>
        </div>

        <div
          className={styles.uploadArea}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className={styles.previewImage} />
          ) : (
            <p>{t("drag-and-drop-or-click-to-upload")}</p>
          )}
          <input
            id="fileInput"
            type="file"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0] as File)}
          />
        </div>

        <div className={styles.dialogBody}>
          <input
            type="text"
            placeholder={t("sticker-name")}
            value={stickerName}
            onChange={(e) => setStickerName(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder={t("price-per-second")}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder={t("width")}
            value={width ?? ""}
            onChange={(e) => setWidth(parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder={t("height")}
            value={height ?? ""}
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
          <button onClick={handleSubmit}>{t("create")}</button>
        </div>
      </div>
    </div>
  );
};
