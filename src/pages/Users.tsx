import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import CampaignSidebar from '@/components/CampaignSidebar';
import usersData from '../../user.json';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const itemsPerPage = 10;

  // Filter users based on search term
  const filteredUsers = usersData.filter(user =>
    user["Nhân viên"].toLowerCase().includes(searchTerm.toLowerCase()) ||
    user["Số điện thoại"].includes(searchTerm) ||
    user["Vai trò"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((_, index) => `${startIndex + index}`));
    }
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
                <h1 className="text-2xl font-semibold text-gray-900">Người dùng</h1>
                <p className="text-gray-600 mt-1">Quản lý danh sách người dùng</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm nhân viên"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                
                {/* Add Employee Button */}
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm nhân viên
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="grid grid-cols-6 gap-4 items-center text-sm font-medium text-gray-500">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <span>Nhân viên</span>
                </div>
                <div>Vai trò</div>
                <div>Số điện thoại</div>
                <div>Ngày tạo</div>
                <div></div>
                <div></div>
              </div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {paginatedUsers.map((user, index) => {
                const userId = `${startIndex + index}`;
                const isSelected = selectedUsers.includes(userId);
                
                return (
                  <div key={index} className="px-6 py-4 hover:bg-gray-50">
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          checked={isSelected}
                          onCheckedChange={() => handleSelectUser(userId)}
                        />
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-medium text-sm">
                            {user["Nhân viên"].charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user["Nhân viên"]}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user["Nhân viên"].toLowerCase().replace(/\s+/g, '.') + '@xiaomi.com'}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Badge 
                          variant={user["Vai trò"] === "Admin" ? "default" : "secondary"}
                          className={user["Vai trò"] === "Admin" ? "bg-orange-100 text-orange-800" : ""}
                        >
                          {user["Vai trò"]}
                        </Badge>
                      </div>
                      <div className="text-gray-900">{user["Số điện thoại"]}</div>
                      <div className="text-gray-900">{user["Ngày tạo"]}</div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {startIndex + 1} mục trên một trang
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

          {/* Success notification (positioned absolutely) */}
          {selectedUsers.length > 0 && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Xóa nhân viên thành công</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;