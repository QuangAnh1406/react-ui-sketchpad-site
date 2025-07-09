
import React from 'react';
import { Search, Plus, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreateCampaignDialog from './CreateCampaignDialog';

const CampaignHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Megaphone className="w-5 h-5 text-orange-500" />
            <h1 className="text-xl font-semibold text-orange-500">Chiến dịch</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <CreateCampaignDialog>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tạo chiến dịch
            </Button>
          </CreateCampaignDialog>
        </div>
      </div>
    </header>

  );
};

const Badge = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
  </svg>
);

export default CampaignHeader;
