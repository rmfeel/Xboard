import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { forgetPassword, sendVerifyCode } from '../services/auth';

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await forgetPassword(values);
      message.success('重置成功，请登录');
      navigate('/login');
    } catch (error: any) {
      message.error(error.response?.data?.message || '重置失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
      try {
          const email = form.getFieldValue('email');
          if(!email) {
              message.error('请先输入邮箱');
              return;
          }
          setSending(true);
          await sendVerifyCode(email);
          message.success('验证码已发送');
      } catch (error: any) {
          message.error(error.response?.data?.message || '发送失败');
      } finally {
          setSending(false);
      }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card title="重置密码" style={{ width: 350 }}>
        <Form
          form={form}
          name="forget"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱!', type: 'email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>
           <Form.Item
            name="email_code"
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <div style={{ display: 'flex', gap: 8 }}>
                <Input placeholder="验证码" />
                <Button onClick={handleSendCode} loading={sending}>发送</Button>
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="新密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              重置
            </Button>
            <div style={{ marginTop: 10, textAlign: 'center' }}>
                <Link to="/login">返回登录</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgetPassword;
