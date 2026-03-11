import Order from '../schemas/Orders.js';

class DashboardController {
  async index(req, res) {
    try {
      // 1. Total Revenue & Order Count
      const orders = await Order.find();

      let totalRevenue = 0;
      const productSales = {};
      const dailyRevenue = {};

      // Initialize last 7 days for the chart
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        dailyRevenue[dateString] = 0;
      }

      orders.forEach((order) => {
        // Only count approved or delivered orders for revenue (simplified for now)
        // If your system doesn't have a specific 'paid' status yet, let's count all except cancelled
        if (order.status !== 'Pedido cancelado') {
          let orderTotal = 0;
          order.products.forEach((product) => {
            const subtotal = product.price * product.quantity;
            orderTotal += subtotal;
            totalRevenue += subtotal;

            // Top Products
            if (productSales[product.name]) {
              productSales[product.name] += product.quantity;
            } else {
              productSales[product.name] = product.quantity;
            }
          });

          // Daily Revenue
          const orderDate = new Date(order.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          });
          if (dailyRevenue[orderDate] !== undefined) {
            dailyRevenue[orderDate] += orderTotal;
          }
        }
      });

      // Format Top Products for Recharts
      const topProducts = Object.entries(productSales)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      // Format Daily Revenue for Recharts
      const revenueData = Object.entries(dailyRevenue).map(([date, value]) => ({
        date,
        revenue: value / 100, // assuming price is in cents
      }));

      return res.json({
        totalRevenue: totalRevenue / 100,
        orderCount: orders.length,
        topProducts,
        revenueData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao processar dados do dashboard' });
    }
  }
}

export default new DashboardController();
