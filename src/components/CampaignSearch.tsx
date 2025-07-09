
import React from 'react';
import { Search, Plus, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreateCampaignDialog from './CreateCampaignDialog';

interface CampaignSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CampaignSearch = ({ searchTerm, onSearchChange }: CampaignSearchProps) => {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-2">
            <div className="flex justify-end">
                <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Tìm kiếm chiến dịch"
                        className="pl-10 w-80"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>

    );
};

const Badge = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
);

export default CampaignSearch;
