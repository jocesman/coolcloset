export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard de Administración</h1>
      <p>Panel de administración funcionando correctamente.</p>
      
      <div className="mt-8 space-y-4">
        <a href="/admin/categories" className="block text-blue-600 hover:underline">
          → Ir a Categorías
        </a>
        <a href="/admin/products" className="block text-blue-600 hover:underline">
          → Ir a Productos
        </a>
        <a href="/admin/users" className="block text-blue-600 hover:underline">
          → Ir a Usuarios
        </a>
        <a href="/admin/orders" className="block text-blue-600 hover:underline">
          → Ir a Órdenes
        </a>
      </div>
    </div>
  );
}
