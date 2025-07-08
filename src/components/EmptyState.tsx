
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateCampaignDialog from './CreateCampaignDialog';

const EmptyState = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        {/* Empty State Illustration */}
        <div className="mb-6">
          <div className="mx-auto w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m-4-4c.618-2.685 2.015-5.082 4-7m-4 7c-1.279.165-2.619.252-4 .252-8.837 0-16-3.582-16-8m20-.252A9.004 9.004 0 0 1 44 34c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8c1.381 0 2.721.351 3.872 1"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Bạn chưa tạo chiến dịch nào.
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Hãy tạo chiến dịch để bắt đầu tăng trưởng doanh thu.
          </p>
        </div>

        {/* Action Button */}
        <CreateCampaignDialog>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2">
            <Plus className="w-4 h-4 mr-2" />
            Tạo chiến dịch
          </Button>
        </CreateCampaignDialog>
      </div>
    </div>
  );
};

export default EmptyState;
