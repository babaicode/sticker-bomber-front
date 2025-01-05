import { FC } from "react";
import { CreateStickerDialogProps } from "../interfaces/CreateStickerDialogProps";

export const CreateStickerDialog: FC<CreateStickerDialogProps> = ({
  visible,
  onClose
}) => {
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
      </div>
    </div>
  );
};