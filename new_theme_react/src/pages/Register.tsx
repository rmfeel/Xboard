import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { register, sendVerifyCode } from '../services/auth';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res: any = await register(values);
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        message.success('注册成功');
        navigate('/dashboard');
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || '注册失败');
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
      <Card title="注册" style={{ width: 350 }}>
        <Form
          form={form}
          name="register"
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
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
           <Form.Item
            name="invite_code"
          >
            <Input prefix={<UserOutlined />} placeholder="邀请码(可选)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              注册
            </Button>
            或者 <Link to="/login">已有账号登录</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
