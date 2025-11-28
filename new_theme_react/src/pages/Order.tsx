import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, message } from 'antd';
import { fetchOrders } from '../services/userService';

const Order: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
      setLoading(true);
      try {
        const res: any = await fetchOrders();
        setOrders(res.data);
      } finally {
          setLoading(false);
      }
  }

  const handlePay = async (order: any) => {
       console.log(order);
       message.info('请前往支付页面');
  }

  const columns = [
    { title: '订单号', dataIndex: 'trade_no', key: 'trade_no' },
    { title: '周期', dataIndex: 'period', key: 'period' },
    { title: '金额', dataIndex: 'total_amount', key: 'total_amount', render: (val: number) => (val / 100).toFixed(2) },
    { title: '状态', dataIndex: 'status', key: 'status', render: (status: number) => (
        status === 0 ? <Tag color="red">待支付</Tag> : 
        status === 1 ? <Tag color="green">已支付</Tag> : 
        <Tag>已取消</Tag>
    )},
    { title: '创建时间', dataIndex: 'created_at', key: 'created_at', render: (val: number) => new Date(val * 1000).toLocaleString() },
    {
        title: '操作',
        key: 'action',
        render: (_: any, record: any) => (
            record.status === 0 ? <Button type="link" onClick={() => handlePay(record)}>支付</Button> : null
        ),
    },
  ];

  return (
    <div>
      <h2>我的订单</h2>
      <Table dataSource={orders} columns={columns} rowKey="trade_no" loading={loading} />
    </div>
  );
};

export default Order;
