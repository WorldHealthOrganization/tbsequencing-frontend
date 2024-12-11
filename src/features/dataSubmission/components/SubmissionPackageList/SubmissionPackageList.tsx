/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMsal } from '@azure/msal-react';
import SubmissionPackageListHeader from './components/SubmissionPackageListHeader';
import { useCreatePackageMutation, useGetPackagesQuery } from '../../../../services/submissionApi';
import SubmissionPackageListTable from './components/SubmissionPackageListTable';
import PackageModal from '../PackagePage/components/PackageModal';
import { IInputs } from '../PackagePage/components/PackageModal/PackageModal';
import BasePage from '../../../../components/BasePage';
import SubmissionPackageUserInfo from '../PackagePage/components/SubmissionPackageUserInfo';
import { tableContainer } from './styles';

export const SubmissionPackageList = () => {
  const [createModalOpened, setCreateModalOpened] = useState<boolean>(false);
  const openModal = () => setCreateModalOpened(true);
  const closeModal = () => setCreateModalOpened(false);
  const { data, isLoading } = useGetPackagesQuery();
  const [createPackage, { isLoading: isCreatePackageLoading }] = useCreatePackageMutation();
  const { accounts } = useMsal();

  const packagesEmpty = data?.length === 0;
  const shouldRenderPackageList = !packagesEmpty;

  const onCreatePackageClick = () => {
    openModal();
  };

  const handleSubmit: SubmitHandler<IInputs> = async (formData) => {
    try {
      await createPackage({ ...formData });
      closeModal();
    } catch (e) {
      toast.error('There was an error trying to create a package, try another name');
    }
  };

  return (
    <BasePage pageHeader="Submission Package List">
      { accounts[0] && (
        <SubmissionPackageUserInfo />
      )}

      <SubmissionPackageListHeader
        onCreateClick={onCreatePackageClick}
      />
      <PackageModal
        title="New Package"
        isLoading={isLoading || isCreatePackageLoading}
        okayLabel="Create Package"
        cancelLabel="Cancel"
        open={createModalOpened}
        onCancelClick={closeModal}
        onSubmit={handleSubmit}
      />
      {shouldRenderPackageList && (
      <div css={tableContainer}>
        <SubmissionPackageListTable loading={isLoading} packages={data} />
      </div>
      )}
    </BasePage>
  );
};

export default SubmissionPackageList;
