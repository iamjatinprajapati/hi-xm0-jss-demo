import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  getPublicUrl,
  LayoutServiceData,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Scripts from 'src/Scripts';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

interface RouteFields {
  [key: string]: unknown;
  pageTitle: Field;
}

const NovenaLayout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;

  console.log('Layout data');
  console.log(layoutData);

  const fields = route?.fields as RouteFields;

  return (
    <>
      <Scripts />
      <Head>
        <title>{(fields && fields.pageTitle && fields.pageTitle.value.toString()) || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <header>{route && <Placeholder name="novena-jss-header" rendering={route} />}</header>
      {route && <Placeholder name="novena-jss-main" rendering={route} />}
      <footer>{route && <Placeholder name="novena-jss-footer" rendering={route} />}</footer>
    </>
  );
};

export default NovenaLayout;
