import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Search, Lock, Edit, ChevronLeft, ChevronRight, Eye, EyeOff, X } from 'lucide-react';
import CampaignSidebar from '@/components/CampaignSidebar';
import usersData from '../../user.json';
import campaignsData from '../../campaigns.json';

const UserDetail = () => {
  const { userName } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const itemsPerPage = 10;

  // Find user data
  const user = usersData.find(u => u["Nhân viên"] === userName);
  
  if (!user) {
    return <div>Người dùng không tồn tại</div>;
  }

  // Get campaigns shared with this user (randomly assigned for demo)
  const userCampaigns = campaignsData.filter((_, index) => index % 3 === 0); // Demo logic

  // Filter campaigns based on search term
  const filteredCampaigns = userCampaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.manager.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectCampaign = (campaignIndex: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignIndex) 
        ? prev.filter(id => id !== campaignIndex)
        : [...prev, campaignIndex]
    );
  };

  const handleSelectAll = () => {
    if (selectedCampaigns.length === paginatedCampaigns.length) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(paginatedCampaigns.map((_, index) => `${startIndex + index}`));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(Math.abs(amount));
  };

  const getCampaignColor = (index: number) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    return colors[index % colors.length];
  };

  const handleChangePassword = () => {
    if (newPassword.trim()) {
      setIsPasswordDialogOpen(false);
      setNewPassword('');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CampaignSidebar />
      
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header with Breadcrumb */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link to="/users" className="text-gray-400 hover:text-gray-600">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                    <Link to="/users" className="hover:text-gray-700">Người dùng</Link>
                    <span>{'>'}</span>
                    <span>{user["Nhân viên"]}</span>
                  </div>
                  <h1 className="text-2xl font-semibold text-gray-900">{user["Nhân viên"]}</h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-gray-300"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Đổi mật khẩu
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                      <DialogTitle className="text-lg font-semibold">Đổi mật khẩu</DialogTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPasswordDialogOpen(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nhập mật khẩu mới <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="{{matKhauMoi}}"
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsPasswordDialogOpen(false);
                            setNewPassword('');
                          }}
                        >
                          Hủy
                        </Button>
                        <Button
                          onClick={handleChangePassword}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                          disabled={!newPassword.trim()}
                        >
                          Đổi mật khẩu
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - User Info */}
              <div className="col-span-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin chung</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Họ và tên
                        </label>
                        <div className="text-gray-900">{user["Nhân viên"]}</div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="text-gray-900">
                          {user["Nhân viên"].toLowerCase().replace(/\s+/g, '.') + '@xiaomi.com'}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số điện thoại
                        </label>
                        <div className="text-gray-900">{user["Số điện thoại"]}</div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ngày tạo
                        </label>
                        <div className="text-gray-900">{user["Ngày tạo"]}</div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mật khẩu
                        </label>
                        <div className="flex items-center space-x-2">
                          <div className="text-gray-900">
                            {showPassword ? 'password123' : '••••••••••'}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Shared Campaigns */}
              <div className="col-span-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Chiến dịch được chia sẻ ({filteredCampaigns.length})
                  </h3>
                  
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm chiến dịch"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                </div>

                {/* Campaigns Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="grid grid-cols-5 gap-4 items-center text-sm font-medium text-gray-500">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          checked={selectedCampaigns.length === paginatedCampaigns.length && paginatedCampaigns.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                        <span>Chiến dịch</span>
                      </div>
                      <div>Quản lý</div>
                      <div>Tổng khách hàng</div>
                      <div>Doanh thu (VND)</div>
                      <div></div>
                    </div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {paginatedCampaigns.map((campaign, index) => {
                      const campaignId = `${startIndex + index}`;
                      const isSelected = selectedCampaigns.includes(campaignId);
                      
                      return (
                        <div key={index} className="px-4 py-4 hover:bg-gray-50">
                          <div className="grid grid-cols-5 gap-4 items-center">
                            <div className="flex items-center space-x-3">
                              <Checkbox 
                                checked={isSelected}
                                onCheckedChange={() => handleSelectCampaign(campaignId)}
                              />
                              <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded ${getCampaignColor(index)}`}></div>
                                <div className="font-medium text-gray-900 text-sm">
                                  {campaign.name}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">{campaign.manager.name}</div>
                              <div className="text-gray-500">{campaign.manager.email}</div>
                            </div>
                            <div className="text-gray-900 text-sm">
                              {campaign.total_customers.toLocaleString()}
                            </div>
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {formatCurrency(campaign.revenue.amount)}
                              </div>
                              <div className={`text-xs ${
                                campaign.revenue.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {campaign.revenue.change} {campaign.revenue.compared_to}
                              </div>
                            </div>
                            <div></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    {itemsPerPage} mục trên một trang
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{currentPage}</span>
                      <span>{totalPages}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success notification */}
          {showSuccessMessage && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Đổi mật khẩu thành công</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;