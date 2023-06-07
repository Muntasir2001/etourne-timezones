import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import type { AppI18nNamespaces } from 'react-i18next';

const DEFAULT_I18N_NAMESPACES: [] | any = ['common'];

export const typedServerSideTranslations = (locale?: string, keys?: []) =>
	serverSideTranslations(
		locale as string,
		keys ? [...DEFAULT_I18N_NAMESPACES, ...keys] : DEFAULT_I18N_NAMESPACES,
	);
