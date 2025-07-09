
import React, { useState, useEffect } from 'react';
import CampaignSidebar from './CampaignSidebar';
import CampaignHeader from './CampaignHeader';
import CampaignSearch from './CampaignSearch';
import EmptyState from './EmptyState';
import CampaignTable from './CampaignTable';

interface Campaign {
  name: string;
  date: string;
  visibility: string;
  manager: {
    name: string;
    email: string;
  };
  total_customers: number;
  revenue: {
    amount: number;
    change: string;
    compared_to: string;
  };
}

const CampaignLayout = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const response = await fetch('/campaigns.json');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error loading campaigns:', error);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <CampaignSidebar />
        <div className="flex-1 flex flex-col">
          <CampaignHeader />
          <CampaignSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <main className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <CampaignSidebar />
      <div className="flex-1 flex flex-col">
        <CampaignHeader />
        <CampaignSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <main className="flex-1 p-6">
          {campaigns.length === 0 ? (
            <EmptyState />
          ) : (
            <CampaignTable campaigns={campaigns} searchTerm={searchTerm} />
          )}
        </main>
      </div>
    </div>
  );
};

export default CampaignLayout;
