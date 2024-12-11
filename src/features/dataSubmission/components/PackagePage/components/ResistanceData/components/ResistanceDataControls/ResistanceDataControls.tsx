/** @jsxImportSource @emotion/react */
import React, {
  ChangeEvent, useRef,
} from 'react';
import * as styles from './styles';
import { AppButton } from '../../../../../../../../components/AppButton/AppButton';
import PrimaryText from '../../../../../../../../components/typography/PrimaryText';
import { downloadFileViaAnchor } from '../../../../../../../../utils/fileDownload';
import { TEMPLATE_ARCHIVE_NAME, templateUrl } from '../../../../../../../../utils/templateFiles';

interface Props {
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const ResistanceDataControls = ({
  onFileInputChange,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null!);

  const onDownloadTemplateClick = () => {
    downloadFileViaAnchor(templateUrl, TEMPLATE_ARCHIVE_NAME);
  };

  const handleUploadClick = () => {
    inputRef.current.value = '';
    inputRef.current.click();
  };

  return (
    <div css={styles.container}>
      <PrimaryText style={styles.text}>
        Attach files here. Use the template below follow the template that you can download below.
      </PrimaryText>
      <div css={styles.buttonsContainer}>
        <AppButton
          style={styles.browseButton}
          onClick={handleUploadClick}
          variant="contained"
          size="medium"
        >
          Browse files
        </AppButton>
        <AppButton
          startIconName="file_download_icon"
          style={styles.button}
          onClick={onDownloadTemplateClick}
          variant="outlined"
          size="medium"
        >
          Download template
        </AppButton>
      </div>
      <input
        accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        css={styles.fileInput}
        ref={inputRef}
        onChange={onFileInputChange}
        type="file"
        name="file"
      />
    </div>
  );
};

export default ResistanceDataControls;
