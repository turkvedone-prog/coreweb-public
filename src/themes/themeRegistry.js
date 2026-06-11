import React from 'react';

const themeRegistry = {
  burobig: {
    // Layout
    Header: React.lazy(() => import('./burobig/BurobigHeader')),
    Footer: React.lazy(() => import('./burobig/BurobigFooter')),

    // Pages
    Home: React.lazy(() => import('./burobig/BurobigHome')),
    BlogList: React.lazy(() => import('./burobig/BurobigBlogList')),
    fetchBlogs: true,
    Contact: React.lazy(() => import('./burobig/BurobigContact')),
    DesignPhilosophy: React.lazy(() => import('./burobig/BurobigDesignPhilosophy')),
    DesignProcess: React.lazy(() => import('./burobig/BurobigDesignProcess')),
    Designers: React.lazy(() => import('./burobig/BurobigDesigners')),
    History: React.lazy(() => import('./burobig/BurobigHistory')),
    Manifesto: React.lazy(() => import('./burobig/BurobigManifesto')),
    ProductDetail: React.lazy(() => import('./burobig/BurobigProductDetail')),
    ProductList: React.lazy(() => import('./burobig/BurobigProductList')),
    QualityPolicy: React.lazy(() => import('./burobig/BurobigQualityPolicy')),
    Sustainability: React.lazy(() => import('./burobig/BurobigSustainability'))
  },
  capilon: {
    // Layout
    Header: React.lazy(() => import('./capilon/CapilonHeader')),
    Footer: React.lazy(() => import('./capilon/CapilonFooter')),

    // Pages
    Home: React.lazy(() => import('./capilon/CapilonHome')),
    BlogDetail: React.lazy(() => import('./capilon/CapilonBlogDetail')),
    BlogList: React.lazy(() => import('./capilon/CapilonBlogList')),
    CategoryDetail: React.lazy(() => import('./capilon/CapilonCategoryDetail')),
    Collections: React.lazy(() => import('./capilon/CapilonCollectionsPage')),
    Contact: React.lazy(() => import('./capilon/CapilonContact')),
    History: React.lazy(() => import('./capilon/CapilonHistory')),
    ProductDetail: React.lazy(() => import('./capilon/CapilonProductDetail')),
    Stores: React.lazy(() => import('./capilon/CapilonStores'))
  },
  burckaplama: {
    // Layout
    Header: React.lazy(() => import('./burckaplama/BurcKaplamaHeader')),
    Footer: React.lazy(() => import('./burckaplama/BurcKaplamaFooter')),

    // Pages
    Home: React.lazy(() => import('./burckaplama/BurcKaplamaHome'))
  },
  viola: {
    Header: React.lazy(() => import('./viola/ViolaHeader')),
    Footer: React.lazy(() => import('./viola/ViolaFooter')),
    Home: React.lazy(() => import('./viola/ViolaHome')),
    ProductDetail: React.lazy(() => import('./viola/ViolaProductDetail'))
  },
  coreweb: {
    Home: React.lazy(() => import('./coreweb/CoreWebHome')),
    Header: React.lazy(() => import('./coreweb/CoreWebHeader')),
    Footer: React.lazy(() => import('./coreweb/CoreWebFooter'))
  }
};

export default themeRegistry;
