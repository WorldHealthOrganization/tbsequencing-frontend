import { Nullable } from '../../models/tsHelpers';
import { IUserMessage } from '../../components/Chat/models';

export interface ICreatePackageRequest {
  name: string;
  description?: string;
  origin?: string;
}

export interface IUpdatePackageRequest extends ICreatePackageRequest {
  packageId: number;
  name: string;
}

export interface IUpdateSampleRequest {
  packageId: number;
  sampleId: number;
  name: string;
}

export interface IPDSMICTest {
  pk: number;
  url: string;
  concentration: number;
  testResult: string;
  staging: boolean;
  sampleAlias: IDataSample;
}

export type PackageState = 'DRAFT' | 'PROCESSING' | 'PENDING' | 'ACCEPTED' | 'REJECTED';
export type MatchingState = 'NEVER_MATCHED' | 'MATCHED' | 'CHANGED';

interface IPackageAttachment {
  createdAt: string;
  file: string;
  originalFilename: string;
  pk: number;
  size: number;
  type: PackageAttachmentType;
}

export interface IPackage {
  attachments: IPackageAttachment[];
  description: string;
  name: string;
  origin: string;
  pk: number;
  state: PackageState;
  stateChangedOn: string;
  url: string;
  micTests: IPDSMICTest[];
  pdsTests: IPDSMICTest[];
  matchingState: MatchingState;
  messagesCount: number;
  micTestsCount: number;
  sequencingDataCount: number;
  pdsTestsCount: number;
  pdsDrugsCount: number;
  micDrugsCount: number;
  pdsDrugConcentrationCount: number;
  pdsDrugs: string[];
  micDrugs: string[];
  sampleAliasesCount: number;
}

export interface IDataUploadResponse {
  url: string;
  pk: number;
  type: ResistanceSampleType;
  filename: string;
  testsCount: number;
  uploadedOn: string;
  samples: string;
}

export interface RemoveMICPDSTests {
  packageId: number;
  type: RemoveTestsFileType;
}

export interface IDataSampleData {
  additionalGeographicalInformation: string;
  biosampleId: number;
  country: string;
  isolationSource: string;
  latitude: number;
  longitude: number;
  patiendId: number;
  samplingDate: string;
  submissionDate: string;
}

export type MatchSource =
  'NO_MATCH' | 'FASTQ_UPLOADED' | 'FASTQ_UPLOADED_NEW_SAMPLE' | 'FASTQ_EXISTING' | 'NCBI' | 'NCBI_FASTQ' | 'USER_ALIAS';

export type VerdictLevel = 'info' | 'warning' | 'error';

export interface IVerdict {
  level: VerdictLevel;
  verdict: string;
}

export interface IDataSample {
  createdAt: string;
  fastqPrefix: string;
  name: string;
  pk: number;
  url: string;
  verdicts: IVerdict[];
  sample: IDataSampleData;
  micTestsCount: number;
  pdsTestsCount: number;
  matchSource: Nullable<MatchSource>
}

export type GetSamplesByFileIdResponse = IDataSample[];

export type GetPackagesResponse = IPackage[];

export type ResistanceSampleType = 'MIC' | 'PDST';
export type RemoveTestsFileType = 'mic' | 'pds';
export type PackageAttachmentType = 'MIC' | 'PDS';

export interface IFile {
  file: string;
  filename: string;
  testCount: number;
  type: ResistanceSampleType;
  uploadedOn: string;
  url: string;
  pk: number;
}

export interface IGetPackageWithSamplesRequest {
  packageId: number;
}

export interface IGetPackageWithSamplesResponse extends IPackage {
  samples: IDataSample[],
  micSamples: IDataSample[],
  pdsSamples: IDataSample[],
}

export interface IGetSequencingFileLinkRequest {
  packageId: number;
  filename: string;
}

export interface IGetSequencingFileLinkResponse {
  url: string;
}

export interface IFetchFileFromS3Request {
  packageId: number;
  filename: string;
}

export interface ISequencingData {
  dataLocation: string;
  filePath: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  libraryName: string;
  pk: number;
}

export interface IFetchFileFromS3Response {
  filename: string;
  pk?: number;
  createdAt: string;
  sequencingData: ISequencingData;
  verdicts: IVerdict[];
}

export interface ISequencingFile extends IFetchFileFromS3Response {
  isLoading: boolean;
  isError: boolean;
  onRemoveClick?: () => void;
  onDownloadClick?: () => void;
  errorMsg?: string;
  progress: number;
  uploadedSize: number;
  isUloadingFile: boolean;
  isProcessingFile: boolean;
}

export interface IRemoveSequencingFileFromPackageRequest {
  packageId: number;
  fileId: number;
}

export interface IMatchPackageRequest {
  packageId: number;
  packageName?: string;
}

export interface IMatchPackageResponse extends IPackage {}

export interface IContributor {
  firstName: string;
  lastName: string;
  role: string;
}

export interface ISetContributorsRequest {
  contributors: IContributor[];
  packageId: number;
}

export interface ISubmitPackageRequest {
  packageId: number;
}

export interface IMessage {
  pk: string | number,
  sender: IUserMessage,
  timestamp: string,
  content: string,
}
