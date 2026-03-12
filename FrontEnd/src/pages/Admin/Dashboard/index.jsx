import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useUser } from '../../../hooks/UserContext';
import api from '../../../services/api';
import { formatPrice } from '../../../utils/formatPrice';
import { CardChart, CardStat, Container, GridCharts, GridStats } from './styles';

export function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUser();

  useEffect(() => {
    async function loadDashboardData() {
      // Mock data for visitors
      if (!userInfo?.admin) {
        const mockData = {
          totalRevenue: 1254050, // R$ 12.540,50
          orderCount: 342,
          revenueData: [
            { date: '05/03', revenue: 120000 },
            { date: '06/03', revenue: 150000 },
            { date: '07/03', revenue: 110000 },
            { date: '08/03', revenue: 180000 },
            { date: '09/03', revenue: 220000 },
            { date: '10/03', revenue: 190000 },
            { date: '11/03', revenue: 250000 },
          ],
          topProducts: [
            { name: 'X-Burguer Clássico', quantity: 85 },
            { name: 'Batata Rústica', quantity: 64 },
            { name: 'Coca-Cola 350ml', quantity: 52 },
            { name: 'Combo Especial', quantity: 41 },
            { name: 'Milkshake Chocolate', quantity: 38 },
          ],
        };

        // Simular um pequeno delay de carregamento
        setTimeout(() => {
          setData(mockData);
          setLoading(false);
        }, 800);
        return;
      }

      try {
        const { data } = await api.get('/dashboard');
        setData(data);
      } catch (err) {
        console.error('Erro ao carregar dados do dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [userInfo]);

  if (loading || !data) {
    return (
      <Container>
        <p style={{ color: '#fff' }}>Carregando métricas...</p>
      </Container>
    );
  }

  return (
    <Container>
      <GridStats>
        <CardStat>
          <span>Faturamento Total</span>
          <p>{formatPrice(data.totalRevenue)}</p>
        </CardStat>
        <CardStat>
          <span>Total de Pedidos</span>
          <p>{data.orderCount}</p>
        </CardStat>
        <CardStat>
          <span>Ticket Médio</span>
          <p>{formatPrice(data.totalRevenue / (data.orderCount || 1))}</p>
        </CardStat>
      </GridStats>

      <GridCharts>
        <CardChart>
          <h3>Faturamento (Últimos 7 dias)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffee00" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ffee00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                }}
                itemStyle={{ color: '#ffee00' }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#ffee00"
                fillOpacity={1}
                fill="url(#colorRev)"
                strokeWidth={3}
              />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
              <YAxis hide />
            </AreaChart>
          </ResponsiveContainer>
        </CardChart>

        <CardChart>
          <h3>Produtos Mais Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topProducts}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="quantity" fill="#ff8c05" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardChart>
      </GridCharts>
    </Container>
  );
}
