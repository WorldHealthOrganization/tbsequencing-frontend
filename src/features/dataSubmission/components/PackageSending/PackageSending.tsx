/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control, FieldError, FieldErrors, useFieldArray, useForm,
} from 'react-hook-form';
import { match } from 'ts-pattern';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles';
import AppPaper from '../../../../components/AppPaper';
import BasePage from '../../../../components/BasePage';
import PrimaryText from '../../../../components/typography/PrimaryText';
import H1 from '../../../../components/typography/H1';
import TextButton from '../../../../components/TextButton';
import { validateTextField } from '../../../../utils/validators';
import FormFieldsController from '../../../../components/FormFields/components/FormFieldsController';
import { AppButton } from '../../../../components/AppButton/AppButton';
import { IContributor } from '../../../../services/submissionApi/models';
import { useDrawerApi } from '../../../drawer/hooks/useDrawerApi';
import {
  useSetContributorsToPackageMutation,
  useSubmitPackageMutation,
} from '../../../../services/submissionApi';
import { usePackageId } from '../PackagePage/hooks/usePackageId';
import PackageSubmitResult from './components/PackageSubmitResult';
import { getBreadcrumbsConfig } from './utils/getBreadcrumbsConfig';
import { useGetPackageByIdQuery } from '../../../../services/submissionApi/submissionApi';
import ActivityIndicator from '../../../../components/ActivityIndicator';

interface IInputs {
  contributors: IContributor[];
}

const requiredMsg = 'This field is required';

const validationSchema = Yup.object({
  contributors: Yup.array().of(Yup.object({
    firstName: validateTextField(requiredMsg),
    lastName: validateTextField(requiredMsg),
    role: validateTextField(requiredMsg),
  })),
});

export const PackageSending = () => {
  const {
    control, formState, handleSubmit,
  } = useForm<IInputs>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      contributors: [],
    },
  });

  const packageId = usePackageId();
  const {
    data: packageData,
    isLoading: packageLoading,
  } = useGetPackageByIdQuery(packageId);

  const { setDrawerContent, openDrawer } = useDrawerApi();
  const [setContributors] = useSetContributorsToPackageMutation();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submitPackage] = useSubmitPackageMutation();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const { errors, isValid } = formState;
  const { fields, append, remove } = useFieldArray<IInputs>({ name: 'contributors', control });
  const getFieldName = (index: number, key: string) => `contributors[${index}].${key}`;

  if (packageLoading) {
    return <ActivityIndicator centered />;
  }

  if (!packageData) {
    return null;
  }

  if (packageData.matchingState === 'CHANGED' || packageData.matchingState === 'NEVER_MATCHED') {
    navigate(`/data-submission/${packageId}`);
  }

  const packageName = packageData.name;

  const handleAddMoreScientistsClick = () => {
    append({
      firstName: '',
      lastName: '',
      role: '',
    });
  };

  const getError = (
    { fieldError, index, key }: { fieldError: FieldErrors<IInputs>, index: number, key: string },
  ) => {
    const { contributors } = fieldError;

    if (!contributors) {
      return undefined;
    }

    const rowError = contributors[index];
    const cellError = rowError ? rowError[key as keyof IContributor] : undefined;

    return cellError;
  };

  const getOnRemoveHandler = (index: number) => () => {
    remove(index);
  };

  const onSubmit = async (data: IInputs) => {
    const shouldSetContributors = data.contributors.length > 0;

    const submitRequestProps = {
      packageId,
    };

    try {
      if (shouldSetContributors) {
        const setContributorsRequestProps = {
          ...data,
          ...submitRequestProps,
        };

        await setContributors(setContributorsRequestProps).unwrap();
      }

      await submitPackage(submitRequestProps).unwrap();
      setModalOpened(true);
    } catch (error) {
      // @ts-ignore
      if (error.status === 500) {
        navigate(`/data-submission/${packageId}`);
      }

      // @ts-ignore
      setErrorMsg(error.data.errors[0].detail);
      setModalOpened(true);
    }
  };

  const sendAllowed = isValid;

  const handleCloseModal = () => {
    if (!errorMsg) {
      navigate('/data-submission');
    }

    setModalOpened(false);
  };

  const onTermsClick = () => {
    setDrawerContent('termsConditions');
    openDrawer();
  };

  const breadcrumbsConfig = getBreadcrumbsConfig(packageName, packageId);

  return (
    <BasePage breadcrumbsConfig={breadcrumbsConfig}>
      <AppPaper>
        <div>
          <H1 style={styles.section}>Additional acknowledgements</H1>
          <PrimaryText style={styles.section}>
            If necessary, provide here references to all individuals to be acknowledged for the data
            collection and production.
          </PrimaryText>
          {fields.map((field, index) => (
            <div css={styles.rowWrapper} key={field.id}>
              {Object.entries(field).map((entry) => {
                const [key] = entry;

                if (key === 'id') {
                  return null;
                }

                const label = match<keyof IContributor, string>(key as keyof IContributor)
                  .with('firstName', () => 'Name')
                  .with('lastName', () => 'Surname')
                  .with('role', () => 'Institution')
                  .exhaustive();

                const error = getError({ fieldError: errors, index, key });
                const name = getFieldName(index, key);
                const isError = Boolean(error);
                const marginStyles = key === 'lastName' ? styles.secondRow : undefined;

                return (
                  <div css={[styles.inputWrapper, marginStyles]}>
                    <FormFieldsController
                      <IInputs>
                      fieldItem={{
                        label,
                        type: 'text',
                        name,
                      }}
                      control={control as unknown as Control}
                      componentProps={{ required: true, fullWidth: false }}
                      error={error as FieldError}
                      isError={isError}
                    />
                  </div>
                );
              })}
              <IconButton onClick={getOnRemoveHandler(index)} css={styles.removeBtn}>
                <Close sx={styles.sxRemoveIcon} />
              </IconButton>
            </div>
          ))}
          <TextButton
            disabled={!isValid}
            style={styles.addContributorsBtn}
            onClick={handleAddMoreScientistsClick}
            data-testid="addBtn"
          >
            + Add individual
          </TextButton>
        </div>
        <div css={styles.sendButtonWrapper}>
          <div css={styles.agreeTermsWrapper}>
            <FormControlLabel
              value="end"
              control={(
                <Checkbox
                  onChange={() => setIsTermsChecked(!isTermsChecked)}
                  checked={isTermsChecked}
                  css={styles.controlCheck}
                />
              )}
              label="Read and agree with service"
              labelPlacement="end"
            />
            <AppButton
              style={styles.termsButton}
              variant="text"
              size="large"
              onClick={onTermsClick}
            >
              Terms and Conditions
            </AppButton>
          </div>
          <AppButton
            variant="contained"
            size="large"
            disabled={!sendAllowed || !isTermsChecked}
            style={styles.sendBtn}
            onClick={handleSubmit(onSubmit)}
          >
            Send Package
          </AppButton>
        </div>
      </AppPaper>
      <PackageSubmitResult
        errorMsg={errorMsg}
        open={modalOpened}
        onClose={handleCloseModal}
      />
    </BasePage>
  );
};

export default PackageSending;
