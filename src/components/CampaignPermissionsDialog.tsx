
import React, { useState } from 'react';
import { X, User, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface CampaignPermissionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  campaignName: string;
}

const CampaignPermissionsDialog = ({ isOpen, onClose, campaignName }: CampaignPermissionsDialogProps) => {
  const [accessType, setAccessType] = useState('Riêng tư');
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Beyoncé',
      email: 'beyonce@xiaomi.com',
      role: 'Quản lý'
    },
    {
      id: '2',
      name: 'Beyoncé',
      email: 'beyonce@xiaomi.com',
      role: 'Nhân viên'
    },
    {
      id: '3',
      name: 'Beyoncé',
      email: 'beyonce@xiaomi.com',
      role: 'Nhân viên'
    },
    {
      id: '4',
      name: 'Beyoncé',
      email: 'beyonce@xiaomi.com',
      role: 'Nhân viên'
    }
  ]);

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleAddUser = () => {
    console.log('Thêm người dùng mới');
    // TODO: Implement add user functionality
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">Phân quyền chiến dịch</DialogTitle>
              <p className="text-sm text-gray-600 mt-1">Thêm quyền truy cập với chiến dịch này</p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 space-y-4">
          {/* Access Type Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Ai có thể truy cập
            </label>
            <Select value={accessType} onValueChange={setAccessType}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Riêng tư">🔒 Riêng tư</SelectItem>
                <SelectItem value="Công khai">🌐 Công khai</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              Chỉ những người bạn chọn có thể xem chiến dịch này.
            </p>
          </div>

          {/* Add User Section */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Phân quyền truy cập
            </label>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Thêm người được truy cập..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1">Người dùng 1</SelectItem>
                  <SelectItem value="user2">Người dùng 2</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddUser} size="sm">
                Thêm
              </Button>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <User className="w-4 h-4" />
              <span>{users.length} người được truy cập</span>
            </div>
            
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-teal-500 text-white text-xs">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <Select 
                    value={user.role} 
                    onValueChange={(value) => handleRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-24 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quản lý">Quản lý</SelectItem>
                      <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                      <SelectItem value="Khách">Khách</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 pt-4">
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button onClick={onClose}>
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignPermissionsDialog;
