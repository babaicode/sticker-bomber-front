import React, { useState } from 'react';
import '../styles/CreateStickerComponent.css';
import { CreateStickerDialog } from '@/streamer/components/CreateStickerDialog';
import { useTranslation } from 'react-i18next';

const CreateStickerComponent: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className='create-sticker-card-container'>
      <div
        className='create-sticker-card'
        onClick={openDialog}
      >
        <div className="plus-sign"></div>

        <span className="titile">{t("create-sticker")}</span>
      </div>
      <CreateStickerDialog
              visible={isDialogOpen}
              onClose={closeDialog}
            />
    </div>
  );
}

export default CreateStickerComponent;