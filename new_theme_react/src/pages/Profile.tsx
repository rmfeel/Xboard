import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { getUserInfo } from '../services/userService';
import api from '../services/api';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserInfo().then((res: any) => setUser(res.data));
  }, []);

  const onUpdate = async (values: any) => {
      setLoading(true);
      try {
          // Assuming /user/update exists and takes password or other fields
          if (values.password) {
             await api.post('/user/changePassword', { 
                 old_password: values.old_password,
                 new_password: values.password 
             });
          }
          // Other update logic...
          message.success('更新成功');
      } catch (error: any) {
          message.error(error.response?.data?.message || '更新失败');
      } finally {
          setLoading(false);
      }
  }

  if (!user) return null;

  return (
    <div>
      <h2>个人中心</h2>
      <Card title="基本信息">
          <p>邮箱: {user.email}</p>
          <p>余额: {user.balance / 100} CNY</p>
          <p>UUID: {user.uuid}</p>
      </Card>

      <Card title="修改密码" style={{ marginTop: 24, maxWidth: 500 }}>
          <Form onFinish={onUpdate} layout="vertical">
              <Form.Item name="old_password" label="旧密码">
                  <Input.Password />
              </Form.Item>
              <Form.Item name="password" label="新密码">
                  <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>保存修改</Button>
          </Form>
      </Card>
    </div>
  );
};

export default Profile;
