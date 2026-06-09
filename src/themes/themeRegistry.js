import React from 'react';

const themeRegistry = {
  burobig: {
    Home: React.lazy(() => import('./burobig/BurobigHome')),
    Header: React.lazy(() => import('./burobig/BurobigHeader')),
    Footer: React.lazy(() => import('./burobig/BurobigFooter')),
    ProductList: React.lazy(() => import('./burobig/BurobigProductList')),
    ProductDetail: React.lazy(() => import('./burobig/BurobigProductDetail')),
    Contact: React.lazy(() => import('./burobig/BurobigContact')),
    History: React.lazy(() => import('./burobig/BurobigHistory')),
    BlogList: React.lazy(() => import('./burobig/BurobigBlogList')),
    DesignPhilosophy: React.lazy(() => import('./burobig/BurobigDesignPhilosophy')),
    DesignProcess: React.lazy(() => import('./burobig/BurobigDesignProcess')),
    Designers: React.lazy(() => import('./burobig/BurobigDesigners')),
    Manifesto: React.lazy(() => import('./burobig/BurobigManifesto')),
    QualityPolicy: React.lazy(() => import('./burobig/BurobigQualityPolicy')),
    Sustainability: React.lazy(() => import('./burobig/BurobigSustainability'))
  },
  capilon: {
    Home: React.lazy(() => import('./capilon/CapilonHome')),
    Header: React.lazy(() => import('./capilon/CapilonHeader')),
    Footer: React.lazy(() => import('./capilon/CapilonFooter')),
    ProductDetail: React.lazy(() => import('./capilon/CapilonProductDetail')),
    Contact: React.lazy(() => import('./capilon/CapilonContact')),
    History: React.lazy(() => import('./capilon/CapilonHistory')),
    BlogList: React.lazy(() => import('./capilon/CapilonBlogList')),
    BlogDetail: React.lazy(() => import('./capilon/CapilonBlogDetail')),
    CategoryDetail: React.lazy(() => import('./capilon/CapilonCategoryDetail')),
    CollectionsPage: React.lazy(() => import('./capilon/CapilonCollectionsPage')),
    Stores: React.lazy(() => import('./capilon/CapilonStores'))
  },
  burckaplama: {
    Home: React.lazy(() => import('./burckaplama/BurcKaplamaHome')),
    Header: React.lazy(() => import('./burckaplama/BurcKaplamaHeader')),
    Footer: React.lazy(() => import('./burckaplama/BurcKaplamaFooter')),
    ProductList: React.lazy(() => import('./burckaplama/BurcKaplamaProductList')),
    ProductDetail: React.lazy(() => import('./burckaplama/BurcKaplamaProductDetail')),
    Contact: React.lazy(() => import('./burckaplama/BurcKaplamaContact')),
    History: React.lazy(() => import('./burckaplama/BurcKaplamaHistory'))
  },
  coreweb: {
    Home: React.lazy(() => import('./coreweb/CoreWebHome')),
    Header: React.lazy(() => import('./coreweb/CoreWebHeader')),
    Footer: React.lazy(() => import('./coreweb/CoreWebFooter')),
  }
};

export default themeRegistry;
