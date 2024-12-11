import {
  ChangeEvent,
  useCallback, useEffect, useRef, useState,
} from 'react';
import { toast } from 'react-toastify';
import {
  IRemoveSequencingFileFromPackageRequest,
  ISequencingFile,
} from '../../../../../services/submissionApi/models';
import {
  useGetAllSequencingFilesQuery,
  useGetSequencingFileLinkMutation, useRemoveSequenceFileFromPackageMutation,
} from '../../../../../services/submissionApi';
import { useS3Upload } from './useS3Upload';
import { downloadFileViaAnchor } from '../../../../../utils/fileDownload';
import { useProgressApi } from '../../../hooks/useProgressApi';

interface IUseManageSequencingDataProps {
  packageId: number;
}

const LOCAL_ADDITIONAL_PROPS = {
  createdAt: '',
  verdicts: [],
  sequencingData: {
    filePath: '',
    fileName: '',
    libraryName: '',
    pk: 0,
    dataLocation: '',
    fileUrl: '',
    fileSize: 0,
  },
};

export const getLocalAdditionalProps = (fileSize: number): typeof LOCAL_ADDITIONAL_PROPS => ({
  createdAt: '',
  verdicts: [],
  sequencingData: {
    filePath: '',
    fileName: '',
    libraryName: '',
    pk: 0,
    dataLocation: '',
    fileUrl: '',
    fileSize,
  },
});

export const useManageSequencingData = ({ packageId }: IUseManageSequencingDataProps) => {
  const sequencingFileRef = useRef<File[]>([]);
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);

  const { progress } = useProgressApi();
  const {
    data: sequencingData,
    isLoading: isSequencingDataLoading,
  } = useGetAllSequencingFilesQuery(packageId);

  const [removeSequenceFile,
    {
      isLoading: isRemoveSequenceFileLoading,
      data: removeSequenceFileData,
      error: removeSequenceFileError,
      originalArgs: removeSequenceFileOriginalArgs,
    },
  ] = useRemoveSequenceFileFromPackageMutation();

  const [
    sequencingDataState, setSequencingDataState,
  ] = useState<ISequencingFile[]>(sequencingData!);

  const {
    uploadFileToS3,
    fetchFileFromS3,
  } = useS3Upload();

  const addFileToSequencingData = (file: ISequencingFile) => {
    setSequencingDataState((prevState) => [...prevState, file]);
  };

  const isFileExistsInLocalState = (filename: string) => {
    const foundItem = sequencingDataState.find((file) => file.filename === filename);

    return Boolean(foundItem);
  };

  const removeLocalSequenceFileFromState = (filename: string) => {
    setSequencingDataState((prevState) => prevState
      .filter((prevFile) => prevFile.filename !== filename));
  };

  const getOnDownloadHandler = (fileName: string, fileUrl: string) => () => {
    downloadFileViaAnchor(fileUrl, fileName);
  };

  const removeSequenceFileFromPackage = useCallback((
    requestProps: IRemoveSequencingFileFromPackageRequest,
  ) => {
    removeSequenceFile(requestProps);
  }, [removeSequenceFile]);

  const patchDataWithAdditionalHandlers = useCallback((
    data: ISequencingFile[],
  ) => data.map((sequencingFile) => {
    const {
      sequencingData: { fileUrl },
      filename,
      pk,
      isError,
      isLoading,
      isUloadingFile,
      isProcessingFile,
    } = sequencingFile;

    return ({
      ...sequencingFile,
      onRemoveClick: sequencingFile.isError
        ? () => removeLocalSequenceFileFromState(filename)
        : () => {
          removeSequenceFileFromPackage({ packageId, fileId: pk || 0 });
        },
      onDownloadClick: (
        !isError && !isLoading && !isUloadingFile && !isProcessingFile
      ) ? getOnDownloadHandler(filename, fileUrl) : undefined,
    });
  }), [packageId, removeSequenceFileFromPackage]);

  const mergeSequencingDataWithLocalState = useCallback((newSequencingData: ISequencingFile[]) => {
    setSequencingDataState((prevState) => {
      if (!prevState || prevState.length === 0) {
        return patchDataWithAdditionalHandlers(newSequencingData);
      }

      const mergedData = [...prevState, ...newSequencingData];
      const names = mergedData.map((file) => file.filename);
      const filteredMergedData = mergedData
        .map((file) => ({
          ...file,
          isLoading: false,
        }))
        .filter(
          ({ filename }, index) => !names.includes(filename, index + 1),
        );

      return patchDataWithAdditionalHandlers(filteredMergedData);
    });
  }, [
    patchDataWithAdditionalHandlers,
  ]);

  const updateFileInSequencingData = useCallback((
    file: ISequencingFile,
  ) => {
    setSequencingDataState((prevState) => {
      const updatedData = prevState.map((stateFile) => {
        if (file.filename === stateFile.filename) {
          return file;
        }

        return stateFile;
      });

      return updatedData;
    });
  }, []);

  const [getSequencingFileUploadLink,
  ] = useGetSequencingFileLinkMutation();

  useEffect(() => {
    if (!sequencingData) {
      return;
    }

    mergeSequencingDataWithLocalState(sequencingData);
  }, [sequencingData, mergeSequencingDataWithLocalState]);

  useEffect(() => {
    if (!removeSequenceFileError && removeSequenceFileOriginalArgs && sequencingData) {
      const file = sequencingData
        .find((sData) => sData.pk === removeSequenceFileOriginalArgs.fileId);

      if (!file) {
        return;
      }

      removeLocalSequenceFileFromState(file.filename);
    }
  }, [removeSequenceFileData, removeSequenceFileError]);

  useEffect(() => {
    if (!sequencingData) {
      return;
    }
    setSequencingDataState((prevState) => {
      const updatedData = prevState.map((stateFile) => {
        const fileUploadProgres = progress.find(
          (progressEl) => progressEl.fileName === stateFile.filename,
        );
        return {
          ...stateFile,
          uploadedSize: fileUploadProgres?.uploadedSizeCount || 0,
          progress: fileUploadProgres?.progressCount || 0,
        };
      });

      return updatedData;
    });
  }, [sequencingData, progress]);

  const handleSequencingFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    // TODO move to hook?
    const selectedFiles = event?.currentTarget?.files;

    if (!selectedFiles) {
      return;
    }

    const selectedFilesArray = Array.from(selectedFiles);

    const asyncFileUpl = async (selectedFile: File) => {
      const filename = selectedFile.name;
      const uploadLinkRequestParams = { packageId, filename };

      if (isFileExistsInLocalState(filename)) {
        toast.error('File with this name already exists, please rename or use another file');

        return;
      }

      const fileProps = {
        filename,
        url: '',
        isLoading: false,
        libraryName: '',
        dataLocation: '',
        isUloadingFile: false,
        isProcessingFile: false,
        uploadedSize: 0,
        progress: 1,
      };

      getSequencingFileUploadLink(uploadLinkRequestParams).unwrap()
        .then((data) => {
          addFileToSequencingData({
            ...fileProps,
            ...getLocalAdditionalProps(selectedFile.size),
            isLoading: true,
            uploadedSize: 0,
            isUloadingFile: true,
            progress: 0,
            isError: false,
          });
          uploadFileToS3({ url: data.url, file: selectedFile }).unwrap().then(() => {
            updateFileInSequencingData({
              ...fileProps,
              ...getLocalAdditionalProps(selectedFile.size),
              isError: false,
              onRemoveClick: () => removeLocalSequenceFileFromState(filename),
              isUloadingFile: false,
              isProcessingFile: true,
            });
            fetchFileFromS3(uploadLinkRequestParams).unwrap().then((fetchFromS3Data) => {
              setGlobalLoading(false);

              updateFileInSequencingData({
                ...fileProps,
                ...getLocalAdditionalProps(selectedFile.size),
                sequencingData: {
                  // @ts-ignore
                  ...fetchFromS3Data.sequencingData,
                },
                isProcessingFile: false,
                isLoading: false,
                isError: false,
                onRemoveClick: () => removeLocalSequenceFileFromState(filename),
              });
            }).catch((error) => {
              const errorMsg = error?.data?.errors[0].detail || 'Something went wrong';

              updateFileInSequencingData({
                ...fileProps,
                ...getLocalAdditionalProps(selectedFile.size),
                isError: true,
                onRemoveClick: () => removeLocalSequenceFileFromState(filename),
                errorMsg,
              });

              setGlobalLoading(false);
            });
          }).catch(() => {
            toast.error('There was an error while uploading file to s3, please try again');
          });
        }).catch((error) => {
          if (error.status === 400) {
            toast.error('File with this name already exists, please rename or use another file');
          }

          if (
          // @ts-ignore
            error.status === 409
          ) {
            toast.error('File is already uploaded, proceed to fetch directly.');
            addFileToSequencingData({
              ...fileProps,
              ...getLocalAdditionalProps(selectedFile.size),
              isLoading: true,
              uploadedSize: 0,
              isProcessingFile: true,
              progress: 0,
              isError: false,
            });
            fetchFileFromS3({ packageId, filename }).unwrap()
              .then((fetchFromS3Data) => {
                setGlobalLoading(false);
                updateFileInSequencingData({
                  ...fileProps,
                  ...getLocalAdditionalProps(selectedFile.size),
                  sequencingData: {
                    // @ts-ignore
                    ...fetchFromS3Data.sequencingData,
                  },
                  isError: false,
                  onRemoveClick: () => removeLocalSequenceFileFromState(filename),
                });
              }).catch((fetchFileFromS3ErrorPromise) => {
                const name = filename;

                // @ts-ignore
                const errorMsg = fetchFileFromS3ErrorPromise.data.errors[0].detail;

                updateFileInSequencingData({
                  ...fileProps,
                  ...getLocalAdditionalProps(selectedFile.size),
                  isError: true,
                  onRemoveClick: () => removeLocalSequenceFileFromState(name),
                  errorMsg,
                });

                setGlobalLoading(false);
              });
          }
        });
    };

    selectedFilesArray.forEach(asyncFileUpl);
    sequencingFileRef.current = selectedFilesArray;
  };

  const getNonErrorSequencingFiles = () => sequencingDataState.filter((
    sequencingDataFile,
  ) => !sequencingDataFile.isError);

  const isSomethingInSequencingDataLoading = globalLoading
    || isRemoveSequenceFileLoading
    || isSequencingDataLoading;

  return {
    sequencingDataState,
    handleSequencingFileInputChange,
    getNonErrorSequencingFiles,
    isSomethingInSequencingDataLoading,
  };
};
