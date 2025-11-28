import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Tag } from 'antd';
import { fetchTickets, saveTicket, closeTicket } from '../services/userService';

const Ticket: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
      const res: any = await fetchTickets();
      setTickets(res.data);
  }

  const handleCreate = async (values: any) => {
      try {
          await saveTicket(values);
          message.success('工单创建成功');
          setIsModalOpen(false);
          loadTickets();
      } catch (error: any) {
          message.error('创建失败');
      }
  }

  const handleClose = async (id: number) => {
      try {
          await closeTicket(id);
          message.success('工单已关闭');
          loadTickets();
      } catch (error) {
          message.error('关闭失败');
      }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '主题', dataIndex: 'subject', key: 'subject' },
    { title: '级别', dataIndex: 'level', key: 'level', render: (l: number) => l === 0 ? '低' : l === 1 ? '中' : '高' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: number) => s === 0 ? <Tag color="orange">待回复</Tag> : s === 1 ? <Tag color="green">已回复</Tag> : <Tag>已关闭</Tag> },
    { title: '最后更新', dataIndex: 'updated_at', key: 'updated_at', render: (t: number) => new Date(t * 1000).toLocaleString() },
    { 
        title: '操作', 
        key: 'action', 
        render: (_: any, record: any) => (
            record.status !== 2 && <Button danger size="small" onClick={() => handleClose(record.id)}>关闭</Button>
        )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <h2>工单系统</h2>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>新建工单</Button>
      </div>
      <Table dataSource={tickets} columns={columns} rowKey="id" />

      <Modal title="新建工单" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={form.submit}>
          <Form form={form} onFinish={handleCreate} layout="vertical">
              <Form.Item name="subject" label="主题" rules={[{ required: true }]}>
                  <Input />
              </Form.Item>
              <Form.Item name="level" label="级别" initialValue={0}>
                  <Select options={[{label: '低', value: 0}, {label: '中', value: 1}, {label: '高', value: 2}]} />
              </Form.Item>
              <Form.Item name="message" label="消息" rules={[{ required: true }]}>
                  <Input.TextArea rows={4} />
              </Form.Item>
          </Form>
      </Modal>
    </div>
  );
};

export default Ticket;
