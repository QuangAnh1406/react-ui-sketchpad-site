import React, { useState } from 'react';
import { X, Users, Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateCampaignDialogProps {
  children: React.ReactNode;
}

const CreateCampaignDialog = ({ children }: CreateCampaignDialogProps) => {
  const [open, setOpen] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');
  const [campaignType, setCampaignType] = useState('existing');
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Campaign created:', {
      name: campaignName,
      description: campaignDescription,
      type: campaignType,
      selectedFile: selectedFile,
      selectedFilter: selectedFilter,
    });
    setOpen(false);
  };

  const handleCancel = () => {
    setCampaignName('');
    setCampaignDescription('');
    setCampaignType('existing');
    setSelectedFile('');
    setSelectedFilter('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
      <DialogContent className="sm:max-w-[850px] p-0">
      <DialogContent className="sm:max-w-[850px] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            Tạo chiến dịch mới
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Đặt tên và mô tả chiến dịch để dễ dàng quản lý
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - General Info */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">
                  Thông tin chung
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="campaign-name">
                      Tên chiến dịch <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="campaign-name"
                      placeholder="Tên chiến dịch"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="campaign-description">
                      Mô tả chiến dịch <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-1 relative">
                      <Textarea
                        id="campaign-description"
                        placeholder="Mô tả chiến dịch..."
                        value={campaignDescription}
                        onChange={(e) => setCampaignDescription(e.target.value)}
                        rows={4}
                        className="resize-none"
                        required
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {campaignDescription.length}/100
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Campaign Settings */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">
                  Cài đặt chiến dịch
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Chọn tệp khách hàng <span className="text-red-500">*</span>
                    </Label>
                    
                    <RadioGroup 
                      value={campaignType} 
                      onValueChange={setCampaignType}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className={`flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                        campaignType === 'existing' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                      }`}>
                        <RadioGroupItem value="existing" id="existing" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <Label 
                              htmlFor="existing"
                              className="font-medium text-gray-900 cursor-pointer text-sm"
                            >
                              Chọn tệp tiềm năng có sẵn
                            </Label>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Sử dụng tệp khách hàng có sẵn
                          </p>
                        </div>
                      </div>

                      <div className={`flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                        campaignType === 'custom' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                      }`}>
                        <RadioGroupItem value="custom" id="custom" className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <Label 
                              htmlFor="custom"
                              className="font-medium text-gray-900 cursor-pointer text-sm"
                            >
                              Chọn bộ lọc đã lưu
                            </Label>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Sử dụng những bộ lọc đã lưu
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Show dropdown when "existing" is selected */}
                  {campaignType === 'existing' && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Chọn tệp tiềm năng <span className="text-red-500">*</span>
                      </Label>
                      <Select value={selectedFile} onValueChange={setSelectedFile}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn một hoặc nhiều phân khúc bạn đã tạo..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="segment1">Phân khúc khách hàng VIP</SelectItem>
                          <SelectItem value="segment2">Khách hàng tiềm năng mới</SelectItem>
                          <SelectItem value="segment3">Khách hàng đã mua hàng</SelectItem>
                          <SelectItem value="segment4">Khách hàng quan tâm sản phẩm A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Show dropdown when "custom" (filter) is selected */}
                  {campaignType === 'custom' && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Chọn bộ lọc <span className="text-red-500">*</span>
                      </Label>
                      <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn các bộ lọc đã lưu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="filter1">Bộ lọc khách hàng VIP</SelectItem>
                          <SelectItem value="filter2">Bộ lọc khách hàng mới</SelectItem>
                          <SelectItem value="filter3">Bộ lọc theo độ tuổi</SelectItem>
                          <SelectItem value="filter4">Bộ lọc theo khu vực</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline"
              onClick={handleCancel}
            >
              Hủy
            </Button>
            <Button 
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              Tạo chiến dịch
            </Button>
          </div>
        </form>
      </DialogContent>
      </DialogContent>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignDialog;
