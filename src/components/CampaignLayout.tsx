
import React from 'react';
import CampaignSidebar from './CampaignSidebar';
import CampaignHeader from './CampaignHeader';
import EmptyState from './EmptyState';

const CampaignLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <CampaignSidebar />
      <div className="flex-1 flex flex-col">
        <CampaignHeader />
        <main className="flex-1 p-6">
          <EmptyState />
        </main>
      </div>
    </div>
  );
};

export default CampaignLayout;
