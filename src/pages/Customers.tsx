import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import CampaignSidebar from '@/components/CampaignSidebar';
import customersData from '../../customers.json';

const Customers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter customers based on search term
  const filteredCustomers = customersData.filter(customer =>
    customer.khachHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.soDienThoai.includes(searchTerm) ||
    customer.diaChi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handleCustomerClick = (customerName: string) => {
    navigate(`/customer/${encodeURIComponent(customerName)}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CampaignSidebar />
      
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Khách hàng</h1>
                <p className="text-gray-600 mt-1">Quản lý danh sách khách hàng</p>
              </div>
              
              {/* Search */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Customer Stats */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{customersData.length}</div>
                <div className="text-sm text-blue-600">Tổng khách hàng</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{Math.floor(customersData.length * 0.7)}</div>
                <div className="text-sm text-green-600">Khách hàng hoạt động</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{Math.floor(customersData.length * 0.3)}</div>
                <div className="text-sm text-orange-600">Khách hàng mới</div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500">
                <div>Khách hàng</div>
                <div>Số điện thoại</div>
                <div>Địa chỉ</div>
                <div></div>
              </div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {paginatedCustomers.map((customer, index) => (
                <div key={index} className="px-6 py-4 hover:bg-gray-50">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-medium text-sm">
                          {customer.khachHang.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div 
                          className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                          onClick={() => handleCustomerClick(customer.khachHang)}
                        >
                          {customer.khachHang}
                        </div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                    <div className="text-gray-900">{customer.soDienThoai}</div>
                    <div>
                      <div className="text-gray-900">{customer.diaChi}</div>
                      <div className="text-sm text-gray-500">
                        {customer.quan} • {customer.thanhPho}
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCustomers.length)} của {filteredCustomers.length} khách hàng
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
                <span className="text-sm text-gray-700">
                  Trang {currentPage} / {totalPages}
                </span>
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
  );
};

export default Customers;