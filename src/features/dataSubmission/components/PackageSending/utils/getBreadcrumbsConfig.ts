import { IBreadcrumb } from '../../../../../components/Breadcrumbs/Breadcrumbs';
import { packageListBreadcrumb } from '../../SubmissionPackageList/utils/utils';
import { getDataSubmissionBreadcrumb } from '../../PackagePage/utils/getBreadcrumbsConfig';

export const getBreadcrumbsConfig = (
  packageName: string,
  packageId: number,
):IBreadcrumb[] => [
  {
    ...packageListBreadcrumb,
    isActive: false,
  },
  getDataSubmissionBreadcrumb(
    packageName,
    packageId,
    false,
  ),
  {
    href: `/data-submission/send/${packageId}?packageName=${packageName}`,
    isActive: true,
    label: 'Package sending',
  },
];
