import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Tag, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { fetchPlans, saveOrder } from '../services/userService';

const Plan: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans().then((res: any) => setPlans(res.data));
  }, []);

  const handleBuy = async (plan: any) => {
    try {
        setLoading(true);
        // Create order
        const orderRes: any = await saveOrder({ plan_id: plan.id, period: 'month_price' }); // Default to monthly for demo
        const trade_no = orderRes.data;
        
        message.success(`订单创建成功: ${trade_no}`);
        navigate('/order');
    } catch (error: any) {
        message.error(error.response?.data?.message || '下单失败');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <h2>购买订阅</h2>
      <Row gutter={[16, 16]}>
        {plans.map((plan) => (
          <Col span={8} key={plan.id}>
            <Card 
                title={plan.name} 
                extra={<Tag color="blue">{plan.month_price / 100} CNY/月</Tag>}
                actions={[
                    <Button type="primary" onClick={() => handleBuy(plan)} loading={loading}>立即购买</Button>
                ]}
            >
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(plan.content) }} />
              <p>流量: {plan.transfer_enable} GB</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Plan;
