/** @jsxImportSource @emotion/react */
import React, { ReactElement, useState } from 'react';
import { ModeEditOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { match } from 'ts-pattern';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles';
import H1 from '../../../../../../components/typography/H1';
import PrimaryText from '../../../../../../components/typography/PrimaryText';
import { AppButton } from '../../../../../../components/AppButton/AppButton';
import { useDrawerApi } from '../../../../../drawer/hooks/useDrawerApi';
import { useUpdatePackageMutation } from '../../../../../../services/submissionApi';
import PackageModal, { IInputs } from '../PackageModal/PackageModal';
import { PackageState } from '../../../../../../services/submissionApi/models';
import VerificationBadge from '../../../../../../components/VerificationBadge';

interface Props {
  name: string;
  packageId: number;
  onChatClick: () => void;
  onSyncClick: () => void;
  packageState: PackageState;
  isSubmitAllowed: boolean;
  controlsDisabled: boolean;
  syncAllowed: boolean;
  description: string;
  chatDisabled: boolean;
  isFilesCurrentlyManaging: boolean;
}

const regularInfoMsg = `
  Before the package can be submitted, matching between the sample labels provided in the
  susceptibility results test and the sequencing data will need to be verified.\nAfter uploading 
  the susceptibility results and the sequencing data if relevant, hit the Match button to verify
  the correspondance. For publicly available sequencing data, the process will verify that 
  the labels exist. 
  `;

const approvedInfoMsg = 'Package approved';
const pendingInfoMsg = 'Package waiting for approval';

export const PackagePageHeader = ({
  name, packageId, onChatClick, onSyncClick,
  packageState, isSubmitAllowed, controlsDisabled, syncAllowed,
  description, chatDisabled, isFilesCurrentlyManaging,
}: Props) => {
  const { setDrawerContent, openDrawer } = useDrawerApi();
  const navigate = useNavigate();
  const onInstructionClick = () => {
    setDrawerContent('dataSubmissionInstruction');
    openDrawer();
  };

  const isAccepted = packageState === 'ACCEPTED';
  const shouldRenderStatusBadge = isAccepted || packageState === 'PENDING';
  const infoMsg = match<PackageState, string>(packageState)
    .with('PENDING', () => pendingInfoMsg)
    .with('ACCEPTED', () => approvedInfoMsg)
    .otherwise(() => regularInfoMsg);

  const Badge = match<PackageState, ReactElement>(packageState)
    .with('ACCEPTED', () => <VerificationBadge label="Approved" textIcon="✓" style={styles.approvedBadge} />)
    .with('PENDING', () => <VerificationBadge label="Pending" style={styles.pendingBadge} />)
    .otherwise(() => <div />);

  const [updatePackage] = useUpdatePackageMutation();

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  const handleEditClick = () => {
    setEditModalVisible(true);
  };

  const closeModal = () => {
    setEditModalVisible(false);
  };

  const handleSubmit: SubmitHandler<IInputs> = (formData) => {
    try {
      updatePackage({ ...formData, packageId });
      closeModal();
    } catch (e) {
      toast.error('There was an error trying to create a package, try again later');
    }
  };

  const handleSendPackageClick = () => {
    navigate({
      pathname: `/data-submission/send/${packageId}`,
    });
  };

  return (
    <div css={styles.container}>
      <div css={styles.headerContainer}>
        <H1>{name}</H1>
        {!controlsDisabled && (
        <IconButton
          onClick={handleEditClick}
          css={styles.editButton}
        >
          <ModeEditOutlined sx={styles.sxEditIcon} />
        </IconButton>
        )}
        {shouldRenderStatusBadge && Badge}
      </div>

      <div css={styles.control}>
        <div css={styles.info}>
          <PrimaryText style={styles.infoMsg}>
            {infoMsg}
          </PrimaryText>
        </div>
        <div css={styles.button}>
          <AppButton
            style={styles.button}
            onClick={onInstructionClick}
            variant="text"
            size="medium"
          >
            Instructions
          </AppButton>
          <AppButton
            style={styles.button}
            onClick={onChatClick}
            variant="outlined"
            startIconName="comment"
            size="medium"
            disabled={chatDisabled}
          >
            Chat with Admin
          </AppButton>
          <AppButton
            disabled={!syncAllowed || controlsDisabled || isFilesCurrentlyManaging}
            style={styles.button}
            onClick={onSyncClick}
            variant="contained"
            size="medium"
          >
            Match
          </AppButton>
          <AppButton
            disabled={!isSubmitAllowed || controlsDisabled || isFilesCurrentlyManaging}
            onClick={handleSendPackageClick}
            variant="contained"
            size="medium"
          >
            Send Package
          </AppButton>
        </div>
      </div>
      <PackageModal
        initialDescription={description}
        initialName={name}
        open={editModalVisible}
        onCancelClick={closeModal}
        onSubmit={handleSubmit}
        okayLabel="Save"
        cancelLabel="Cancel"
        isLoading={false}
        title="Rename"
      />
    </div>
  );
};

export default PackagePageHeader;
