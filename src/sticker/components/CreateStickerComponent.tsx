import React, { useState } from 'react';
import styles from '../styles/CreateStickerComponent.module.css';
import { CreateStickerDialog } from '@/streamer/components/CreateStickerDialog';
import { useTranslation } from 'react-i18next';

const CreateStickerComponent: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className={styles.createStickerCardContainer}>
      <div
        className={styles.createStickerCard}
        onClick={openDialog}
      >
        <span className={styles.titile}>{t("create-sticker")}</span>
      </div>
      <CreateStickerDialog
              visible={isDialogOpen}
              onClose={closeDialog}
            />
    </div>
  );
}

export default CreateStickerComponent;