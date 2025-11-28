import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Badge } from 'antd';
import { fetchServers } from '../services/userService';

const Node: React.FC = () => {
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    fetchServers().then((res: any) => setNodes(res.data));
  }, []);

  return (
    <div>
      <h2>节点列表</h2>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={nodes}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.name} extra={<Badge status={item.is_online ? "success" : "error"} text={item.is_online ? "在线" : "离线"} />}>
               <p>倍率: {item.rate}x</p>
               <p>标签: {item.tags?.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Node;
