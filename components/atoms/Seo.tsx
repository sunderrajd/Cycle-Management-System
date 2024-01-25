import Head from 'next/head'

const siteMetadata = {
  title: 'CMS - Cycle Management System',
  description: 'Cycle Rental Systems',
  keywords: 'cms, cycle, management',
  url: 'https://mini-project-umber-six.vercel.app/',
  image: 'https://mini-project-umber-six.vercel.app/logo.png',
}
export default function SEO({ title, image }: { title?: string; image?: string }) {
  const TITLE = (title || '') + (title ? ' | ' : '') + siteMetadata.title
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={siteMetadata.description} />
      <meta name="keywords" content={siteMetadata.keywords} />
      <meta property="og:site_name" content={TITLE} />
      <meta property="og:description" content={siteMetadata.description} />
      <meta property="og:title" content={TITLE} />
      <meta
        property="og:image"
        content={image || siteMetadata.image}
        key={image || siteMetadata.image}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={siteMetadata.description} />
      <meta name="twitter:image" content={image || siteMetadata.image} />
    </Head>
  )
}
