import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ShopifyAnalytics from './ShopifyAnalytics';
import OfflineStoresAnalytics from './OfflineStoresAnalytics';
import WhatsAppAnalytics from './WhatsAppAnalytics';
import EDMAnalytics from './EDMAnalytics';
import LinkedInAnalytics from './LinkedInAnalytics';

const ContentForPrivate: React.FC = () => {
  const [activeTab, setActiveTab] = useState('shopify');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Content Empowerment for Private Domain
        </h1>
        <p className="text-lg text-gray-600">
          Content Empowerment for Shopify, Offline Stores, WhatsApp, EDM, LinkedIn, Channel Partners, Customer Service, and Training
        </p>
      </div>

      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="shopify">Shopify</TabsTrigger>
          <TabsTrigger value="offline">Offline Stores</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="edm">EDM</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
        </TabsList>

        <TabsContent value="shopify">
          <ShopifyAnalytics />
        </TabsContent>

        <TabsContent value="offline">
          <OfflineStoresAnalytics />
        </TabsContent>

        <TabsContent value="whatsapp">
          <WhatsAppAnalytics />
        </TabsContent>

        <TabsContent value="edm">
          <EDMAnalytics />
        </TabsContent>

        <TabsContent value="linkedin">
          <LinkedInAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentForPrivate;