import React, { useEffect, useState } from 'react';
import { Collapse, Card } from 'antd';
import DOMPurify from 'dompurify';
import { fetchKnowledge } from '../services/userService';

const Knowledge: React.FC = () => {
  const [knowledge, setKnowledge] = useState<any[]>([]);

  useEffect(() => {
    fetchKnowledge().then((res: any) => {
        setKnowledge(Object.values(res.data)); 
    });
  }, []);

  return (
    <div>
      <h2>知识库</h2>
      {knowledge.map((category: any, index: number) => (
          <Card key={index} title={category.name || '分类'} style={{ marginBottom: 16 }}>
              <Collapse items={category.articles?.map((article: any) => ({
                  key: article.id,
                  label: article.title,
                  children: <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.body) }} />
              }))} />
          </Card>
      ))}
    </div>
  );
};

export default Knowledge;
