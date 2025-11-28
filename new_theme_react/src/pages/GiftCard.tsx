import React from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { redeemGiftCard } from '../services/userService';

const GiftCard: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        await redeemGiftCard(values.code);
        message.success('兑换成功');
    } catch (error: any) {
        message.error(error.response?.data?.message || '兑换失败');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <h2>兑换卡</h2>
      <Card style={{ maxWidth: 500 }}>
          <Form onFinish={onFinish}>
              <Form.Item name="code" rules={[{ required: true, message: '请输入兑换码' }]}>
                  <Input placeholder="请输入您的兑换码" size="large" />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>立即兑换</Button>
          </Form>
      </Card>
    </div>
  );
};

export default GiftCard;
