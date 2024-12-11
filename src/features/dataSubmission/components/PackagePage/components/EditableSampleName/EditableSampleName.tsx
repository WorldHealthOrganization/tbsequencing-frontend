/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ModeEditOutlined } from '@mui/icons-material';
import * as styles from './styles';
import PrimaryText from '../../../../../../components/typography/PrimaryText';
import EditSampleNameModal from './components/EditSampleNameModal';

interface Props {
  name: string;
  sampleId: number;
  packageId: number;
  controlsDisabled: boolean;
}

export const EditableSampleName = ({
  name, sampleId, packageId, controlsDisabled,
}: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onCloseModal = () => setModalVisible(false);
  const onEditClick = () => setModalVisible(true);

  return (
    <div css={styles.nameWithVerdictContainer}>
      <PrimaryText>{name}</PrimaryText>
      {!controlsDisabled && (
      <>
        <IconButton onClick={onEditClick}>
          <ModeEditOutlined sx={styles.editIconSx} />
        </IconButton>
        <EditSampleNameModal
          sampleId={sampleId}
          packageId={packageId}
          handleCloseModal={onCloseModal}
          name={name}
          open={modalVisible}
        />
      </>
      )}
    </div>
  );
};

export default EditableSampleName;
