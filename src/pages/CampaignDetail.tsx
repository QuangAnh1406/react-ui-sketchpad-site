import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Share, Copy, Settings } from 'lucide-react';
import CampaignSidebar from '@/components/CampaignSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CampaignDetail = () => {
  const { campaignName } = useParams();

  // Mock customer data - in a real app, this would come from an API
  const customers = [
    {
      name: 'Nicki Minaj',
      email: 'nicki.minaj@xiaomi.com',
      phone: '(+84) 674 345 124',
      address: '88 Hai Ba Trung\nHoan Kiem • Hanoi',
      avatar: '🔴'
    },
    {
      name: 'Adele',
      email: 'adele.ad@xiaomi.com',
      phone: '(+84) 345 763 222',
      address: '322 Tran Khat Chan\nHoan Kiem • Hanoi',
      avatar: '🟡'
    },
    {
      name: 'Rihanna',
      email: 'rihanna.ft@xiaomi.com',
      phone: '(+84) 674 345 124',
      address: '345 Pham Van Dong\nCau Giay • Ho Chi Minh',
      avatar: '🔵'
    },
    {
      name: 'Mariah Carey',
      email: 'mariah.cr@xiaomi.com',
      phone: '(+84) 986 598 765',
      address: '26 Vo Thi Sau\nDa Kao • Ho Chi Minh',
      avatar: '⚫'
    },
    {
      name: 'Pink',
      email: 'pink.p@xiaomi.com',
      phone: '(+84) 234 567 890',
      address: '12 Le Loi\nHa Dong • Hanoi',
      avatar: '🔴'
    },
    {
      name: 'Ariana Grande',
      email: 'ariana.gr@xiaomi.com',
      phone: '(+84) 456 789 012',
      address: '789 Nguyen Trai\nThuy Khue • Ho Chi Minh',
      avatar: '🟢'
    },
    {
      name: 'Megan Thee Stallion',
      email: 'megan.ts@xiaomi.com',
      phone: '(+84) 678 901 234',
      address: '456 Nguyen Van Cu\nThanh Xuan • Hanoi',
      avatar: '🟡'
    },
    {
      name: 'Dua Lipa',
      email: 'dua.lipa@xiaomi.com',
      phone: '(+84) 890 123 456',
      address: '102 Tran Hung Dao\nBinh Thanh • Ho Chi Minh',
      avatar: '🔵'
    },
    {
      name: 'Lady Gaga',
      email: 'lady.gaga@xiaomi.com',
      phone: '(+84) 012 345 678',
      address: '88 Hai Ba Trung\nBa Dinh • Hanoi',
      avatar: '🟣'
    },
    {
      name: 'Beyoncé',
      email: 'beyonce.k@xiaomi.com',
      phone: '(+84) 234 567 890',
      address: '231 Ton Duc Thang\nDistrict 1 • Ho Chi Minh',
      avatar: '🔴'
    },
    {
      name: 'Taylor Swift',
      email: 'taylor.sw@xiaomi.com',
      phone: '(+84) 456 789 012',
      address: '72 Phan Dinh Phung\nDong Da • Hanoi',
      avatar: '🟣'
    },
    {
      name: 'Katy Perry',
      email: 'katy.perry@xiaomi.com',
      phone: '(+84) 678 901 234',
      address: '155 Le Duan\nTan Binh • Ho Chi Minh',
      avatar: '🔵'
    },
    {
      name: 'Selena Gomez',
      email: 'selena.g@xiaomi.com',
      phone: '(+84) 890 123 456',
      address: '999 Vo Van Tan\nBa Dinh • Hanoi',
      avatar: '🔵'
    },
    {
      name: 'Jennifer Lopez',
      email: 'jennifer.l@xiaomi.com',
      phone: '(+84) 890 123 456',
      address: '634 Dien Bien Phu\nPhu Nhuan • Ho Chi Minh',
      avatar: '🟢'
    },
    {
      name: 'Shakira',
      email: 'shakira.s@xiaomi.com',
      phone: '(+84) 890 123 456',
      address: '111 Le Quang Dinh\nBinh Thanh • Ho Chi Minh',
      avatar: '⚪'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <CampaignSidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="text-xl font-semibold text-gray-900">
              {campaignName ? decodeURIComponent(campaignName) : 'Chi tiết chiến dịch'}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Chia sẻ
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
              Chỉnh sửa
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 flex-shrink-0">
          <div className="flex space-x-8">
            <button className="py-3 px-1 border-b-2 border-orange-500 text-orange-600 font-medium">
              Tổng quan
            </button>
            <button className="py-3 px-1 text-gray-500 hover:text-gray-700">
              Báo cáo
            </button>
            <button className="py-3 px-1 text-gray-500 hover:text-gray-700">
              Cài đặt
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex min-h-0">
          {/* Left Panel - Campaign Info */}
          <div className="w-80 bg-white border-r border-gray-200 p-6 flex-shrink-0">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Thông tin chung</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Tên chiến dịch</span>
                  <div className="font-medium">{campaignName ? decodeURIComponent(campaignName) : 'Chiến dịch mới'}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Loại chiến dịch</span>
                  <div className="font-medium">Chiến dịch email</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Mô tả chung</span>
                  <div className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis sem risus, eu dignissim quam ullamcorper ac. Donec efficiend consectetur dapibus. In auctor tellus id quam gravida.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Customer List */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Search and Controls */}
            <div className="border-b border-gray-200 p-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Danh sách khách hàng</h3>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Tạo chiến dịch thành công
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Tìm kiếm khách hàng" 
                  className="pl-10"
                />
              </div>
            </div>

            {/* Scrollable Customer Table */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div>
                  {/* Table Header */}
                  <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 sticky top-0 z-10">
                    <div>Khách hàng</div>
                    <div>Số điện thoại</div>
                    <div>Địa chỉ</div>
                    <div></div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {customers.map((customer, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">{customer.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-900">
                          {customer.phone}
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 whitespace-pre-line">
                            {customer.address}
                          </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Fixed Footer with Pagination only */}
            <div className="border-t border-gray-200 flex-shrink-0">
              {/* Pagination */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Select defaultValue="50">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-500">mục trên mỗi trang</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">&lt;</Button>
                  <Button variant="outline" size="sm" className="bg-orange-500 text-white border-orange-500">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">&gt;</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
