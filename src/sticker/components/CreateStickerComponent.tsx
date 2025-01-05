import React, { useState } from 'react';
import '../styles/CreateStickerComponent.css';
import { CreateStickerDialog } from '@/streamer/components/CreateStickerDialog';

const CreateStickerComponent: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className='create-sticker-card-container'>
      <div
        className='create-sticker-card'
        onClick={openDialog}
      >
        <div className="plus-sign"></div>

        <span className="titile">Create sticker</span>
      </div>
      <CreateStickerDialog
              visible={isDialogOpen}
              onClose={closeDialog}
            />
    </div>
  );
}

export default CreateStickerComponent;