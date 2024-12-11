/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import { CSVLink } from 'react-csv';
import { Link, IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import H3 from '../../../../components/typography/H3';
import PrimaryText from '../../../../components/typography/PrimaryText';
import AppButton from '../../../../components/AppButton';
import {
  wrapper,
  box,
  header,
  content,
  mainList,
  boxCard,
  boxCardTitle,
  boxCardBottom,
  boxCardDescription,
  iconSx,
} from './styles';

// import imgPath from '../../../../assets/images/email-sent.png';

import excelOutputPath from '../../../../assets/mut-cat-2023/WHO-UCN-TB-2023.7-eng.xlsx';

import vcfOutputPath from '../../../../assets/mut-cat-2023/Genomic_coordinates_7May2024.vcf.gz';

import pdstOutputPath from '../../../../assets/mut-cat-2023/pdst_biosample.csv';

const mutationsCatalogueFilesList = [
  // {
  //   headerText: 'Report',
  //   description: 'PDF report of the Mutation Catalogue 2023 update initiative',
  //   path: imgPath,
  // },
  {
    headerText: 'Excel tables',
    description: 'Data tables of raw output from the Mutation Catalogue 2023 update initiative',
    path: excelOutputPath,
    name: 'WHO-UCN-TB-2023.7-eng.xlsx',
  },
  {
    headerText: 'VCF file',
    description: 'Variant Call Format (VCF) file linking genomic coordinates to variant categories.',
    path: vcfOutputPath,
    name: 'Genomic_coordinates_7May2024.vcf.gz',
  },
  {
    headerText: 'PDST CSV',
    description: 'CSV file including all raw pDST data used as input for the association algorithm.',
    path: pdstOutputPath,
    name: 'raw_pdst.csv',
  },
];

const MutationsCatalogue = () => {
  // react-scv lib doesn't have types for ref
  const csvRef1 = useRef<any>(null);
  const csvRef2 = useRef<any>(null);
  const csvRef3 = useRef<any>(null);

  const onExportClick = () => {
    csvRef1.current.link.click();
    csvRef2.current.link.click();
    csvRef3.current.link.click();
  };

  return (
    <div css={wrapper}>
      <div css={box}>
        <H3 style={header}>Download files</H3>
        <div css={content}>
          <PrimaryText>
            Please find below all outputs of the Mutation catalogue 2023 update. These files are
            identical to those available from the WHO website.
          </PrimaryText>

          <div>
            <CSVLink
              ref={csvRef1}
              data={mutationsCatalogueFilesList[0].path}
              filename={mutationsCatalogueFilesList[0].headerText}
            />
            <CSVLink
              ref={csvRef2}
              data={mutationsCatalogueFilesList[1].path}
              filename={mutationsCatalogueFilesList[1].headerText}
            />
            <CSVLink
              ref={csvRef3}
              data={mutationsCatalogueFilesList[2].path}
              filename={mutationsCatalogueFilesList[2].headerText}
            />
          </div>

          <AppButton
            onClick={onExportClick}
            variant="contained"
            size="medium"
          >
            Download All
          </AppButton>
        </div>
      </div>
      <div css={mainList}>
        {mutationsCatalogueFilesList.map((file) => (
          <div key={file.headerText} css={boxCard}>
            <div css={boxCardTitle}>{file.headerText}</div>
            <div css={boxCardBottom}>
              <div css={boxCardDescription}>
                {file.description}
              </div>
              <Link
                href={file.path}
                download={file.name}
                target="_blank"
              >
                <IconButton>
                  <FileDownloadIcon css={iconSx} />
                </IconButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MutationsCatalogue;
