import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Edit, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface Customer {
  khachHang: string;
  email: string;
  soDienThoai: string;
  diaChi: string;
  quan: string;
  thanhPho: string;
}

const Prospects = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Array of colors for avatar dots
  const avatarColors = [
    'bg-red-500',
    'bg-yellow-500', 
    'bg-blue-500',
    'bg-black',
    'bg-pink-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-purple-500',
    'bg-indigo-500'
  ];

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetch('/customers.json');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error loading customers:', error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.khachHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.soDienThoai.includes(searchTerm) ||
    customer.diaChi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRandomDate = () => {
    const start = new Date(2018, 0, 1);
    const end = new Date(2023, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Danh sách tiềm năng</h1>
              <p className="text-sm text-gray-500">Tiềm năng • Danh sách khách hàng</p>
            </div>
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Chỉnh sửa</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex">
        {/* Left Panel */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Thông tin chung</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Tên tệp</p>
                  <p className="text-sm text-gray-600">Danh sách tiềm năng</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Mô tả chung</p>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum sed ipsum sem
                    pellentesque dignissim quam ullamcorper ac. Donec elementum cursur nec dapibus.
                    Etiam rhoncus tellus est quam gravida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Tìm kiếm khách hàng"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${avatarColors[index % avatarColors.length]}`}>
                          <span className="text-white text-xs font-medium">
                            {customer.khachHang.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{customer.khachHang}</p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{customer.soDienThoai}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-900">{customer.diaChi}</p>
                        <p className="text-sm text-gray-500">{customer.quan} • {customer.thanhPho}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{getRandomDate()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">50</span>
                <span className="text-sm text-gray-600">mục trên mỗi trang</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  &lt;
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">
                  1
                </Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">4</Button>
                <Button variant="outline" size="sm">5</Button>
                <span className="text-sm text-gray-600">...</span>
                <Button variant="outline" size="sm">10</Button>
                <Button variant="outline" size="sm">11</Button>
                <Button variant="outline" size="sm">12</Button>
                <Button variant="outline" size="sm">13</Button>
                <Button variant="outline" size="sm">
                  &gt;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prospects;