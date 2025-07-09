
import React, { useState, useMemo } from 'react';
import { ChevronDown, Edit, Trash2, MoreHorizontal, ArrowUpDown, Filter, Users, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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

interface CampaignTableProps {
  campaigns: Campaign[];
  searchTerm: string;
}

const CampaignTable = ({ campaigns, searchTerm }: CampaignTableProps) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');

  // Filtering and sorting logic
  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = campaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.manager.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVisibility = visibilityFilter === 'all' || campaign.visibility === visibilityFilter;
      return matchesSearch && matchesVisibility;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue: any = a;
        let bValue: any = b;

        // Navigate to nested properties
        const fields = sortField.split('.');
        for (const field of fields) {
          aValue = aValue[field];
          bValue = bValue[field];
        }

        if (typeof aValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        if (typeof aValue === 'number') {
          return sortDirection === 'asc' 
            ? aValue - bValue
            : bValue - aValue;
        }

        return 0;
      });
    }

    return filtered;
  }, [campaigns, searchTerm, visibilityFilter, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatRevenue = (amount: number) => {
    if (amount < 0) {
      return `-${Math.abs(amount).toLocaleString()}`;
    }
    return amount.toLocaleString();
  };

  const getRevenueColor = (amount: number) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getVisibilityBadge = (visibility: string, onClick: () => void) => {
    const isPrivate = visibility === 'Riêng tư';
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button 
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${
              isPrivate 
                ? 'bg-gray-100 text-gray-800 border border-gray-200' 
                : 'bg-green-100 text-green-800 border border-green-200'
            }`}
            onClick={onClick}
          >
            {isPrivate ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
            {visibility}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48" align="start">
          <div className="space-y-1">
            <div className="font-medium text-sm mb-2">Chỉnh sửa phân quyền</div>
            <button
              className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 flex items-center"
              onClick={() => {
                console.log('Đổi thành Công khai');
                // TODO: Implement visibility change to public
              }}
            >
              <Eye className="w-3 h-3 mr-2" />
              Công khai
            </button>
            <button
              className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 flex items-center"
              onClick={() => {
                console.log('Đổi thành Riêng tư');
                // TODO: Implement visibility change to private
              }}
            >
              <EyeOff className="w-3 h-3 mr-2" />
              Riêng tư
            </button>
            <hr className="my-2" />
            <button
              className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 flex items-center"
              onClick={() => {
                console.log('Mở cài đặt phân quyền chi tiết');
                // TODO: Implement detailed permissions settings
              }}
            >
              <Users className="w-3 h-3 mr-2" />
              Cài đặt chi tiết
            </button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  const handleEdit = (campaign: Campaign) => {
    console.log('Edit campaign:', campaign.name);
    // TODO: Implement edit functionality
  };

  const handleDelete = (campaign: Campaign) => {
    console.log('Delete campaign:', campaign.name);
    // TODO: Implement delete functionality
  };

  const handlePermissions = (campaign: Campaign) => {
    console.log('Edit permissions for campaign:', campaign.name);
    // TODO: Implement permissions functionality
  };

  const handleVisibilityChange = (campaign: Campaign) => {
    console.log('Change visibility for campaign:', campaign.name);
    // TODO: Implement visibility change functionality
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Table Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSort('name')}
              className="flex items-center space-x-1"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Sắp xếp</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Filter className="w-4 h-4" />
                  <span>Lọc</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setVisibilityFilter('all')}>
                  Tất cả
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setVisibilityFilter('Riêng tư')}>
                  Riêng tư
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setVisibilityFilter('Công khai')}>
                  Công khai
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Chiến dịch</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead>Phân quyền</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('manager.name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Quản lý</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 text-right"
                onClick={() => handleSort('total_customers')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Tổng khách hàng</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 text-right"
                onClick={() => handleSort('revenue.amount')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Doanh thu (VND)</span>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedCampaigns.map((campaign, index) => (
              <ContextMenu key={index}>
                <ContextMenuTrigger asChild>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <input type="checkbox" className="rounded" />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.date}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getVisibilityBadge(campaign.visibility, () => handleVisibilityChange(campaign))}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {campaign.manager.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{campaign.manager.name}</div>
                          <div className="text-sm text-gray-500">{campaign.manager.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium text-gray-900">
                        {campaign.total_customers.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={`font-medium ${getRevenueColor(campaign.revenue.amount)}`}>
                        {formatRevenue(campaign.revenue.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {campaign.revenue.change} {campaign.revenue.compared_to}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePermissions(campaign)}>
                            <Users className="w-4 h-4 mr-2" />
                            Phân quyền
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(campaign)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => handleEdit(campaign)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => handlePermissions(campaign)}>
                    <Users className="w-4 h-4 mr-2" />
                    Phân quyền
                  </ContextMenuItem>
                  <ContextMenuItem 
                    onClick={() => handleDelete(campaign)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {filteredAndSortedCampaigns.length} mục trên mỗi trang
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            &lt;
          </Button>
          <Button variant="outline" size="sm" className="bg-orange-500 text-white border-orange-500">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <span className="text-sm text-gray-500">...</span>
          <Button variant="outline" size="sm">
            10
          </Button>
          <Button variant="outline" size="sm">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignTable;
