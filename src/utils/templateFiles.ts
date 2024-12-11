const getStaticFileUrl = (templateName: string) => `${window.location.origin}/static_files/submission/${templateName}`;

export const templateUrl = getStaticFileUrl('resistance_templates_1.zip');
export const TEMPLATE_ARCHIVE_NAME = 'Templates.zip';
