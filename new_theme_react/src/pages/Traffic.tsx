import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { getTrafficLog } from '../services/userService';
// For a real chart, we'd use echarts or chart.js, but I'll just list data for now to save dependencies
// Or use a simple visual representation

const Traffic: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    getTrafficLog().then((res: any) => {
        // logs usually contains [time, u, d]
        setLogs(res.data);
    });
  }, []);

  return (
    <div>
      <h2>流量明细</h2>
      <Card>
          <p>最近流量记录 (API数据展示):</p>
          <div style={{ maxHeight: 400, overflow: 'auto' }}>
            {/* Assuming format, just JSON dump for debugging/learning structure */}
            <pre>{JSON.stringify(logs, null, 2)}</pre>
          </div>
      </Card>
    </div>
  );
};

export default Traffic;
