import { IBreadcrumb } from '../../../../../components/Breadcrumbs/Breadcrumbs';
import { packageListBreadcrumb } from '../../SubmissionPackageList/utils/utils';

export const getDataSubmissionBreadcrumb = (
  packageName: string,
  packageId: number,
  isActive: boolean,
) => ({
  href: `/data-submission/${packageId}`,
  isActive,
  label: packageName,
});

export const getBreadcrumbsConfig = (
  packageId: number,
  packageName: string,
):IBreadcrumb[] => [
  {
    ...packageListBreadcrumb,
    isActive: false,
  },
  getDataSubmissionBreadcrumb(
    packageName,
    packageId,
    true,
  ),
];
