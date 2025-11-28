import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, getSubscribe } from '../services/userService';
import { RocketOutlined, WalletOutlined, CloudDownloadOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [subscribe, setSubscribe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [userRes, subRes] = await Promise.all([
                getUserInfo(),
                getSubscribe()
            ]);
            setUser((userRes as any).data);
            setSubscribe((subRes as any).data);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}><Spin size="large" /></div>;
  if (!user) return null;

  return (
    <div>
      <h2>欢迎回来, {user.email}</h2>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="账户余额"
              value={user.balance / 100}
              precision={2}
              prefix={<WalletOutlined />}
              suffix="CNY"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
             <Statistic
              title="剩余流量"
              value={(user.transfer_enable - user.u - user.d) / 1073741824}
              precision={2}
              prefix={<CloudDownloadOutlined />}
              suffix="GB"
            />
          </Card>
        </Col>
         <Col span={8}>
          <Card>
             <Statistic
              title="订阅状态"
              value={user.plan_id ? '已订阅' : '未订阅'}
              prefix={<RocketOutlined />}
            />
            {subscribe && <div style={{marginTop: 8, color: '#888'}}>到期时间: {new Date(subscribe.expired_at * 1000).toLocaleDateString()}</div>}
          </Card>
        </Col>
      </Row>
      
      <Card title="快速操作" style={{ marginTop: 24 }}>
          <Button type="primary" onClick={() => navigate('/plan')}>购买订阅</Button>
          <Button style={{ marginLeft: 16 }} onClick={() => navigate('/node')}>查看节点</Button>
      </Card>
    </div>
  );
};

export default Dashboard;
