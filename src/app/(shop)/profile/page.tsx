import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Title } from '@/components';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  const user = session.user;

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-3xl mx-auto">
        <Title title="Mi Perfil" />

        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          {/* Información del usuario */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                {user.name || 'No especificado'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                {user.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rol
              </label>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span
                  className={`px-3 py-1 rounded text-sm ${
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Acciones rápidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="/orders"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors text-center"
              >
                <p className="font-medium">Mis Órdenes</p>
                <p className="text-sm text-gray-500">Ver historial de compras</p>
              </a>
              
              {user.role === 'admin' && (
                <a
                  href="/admin"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-colors text-center"
                >
                  <p className="font-medium">Panel Admin</p>
                  <p className="text-sm text-gray-500">Gestionar tienda</p>
                </a>
              )}
            </div>
          </div>

          {/* Nota informativa */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> Para actualizar tu información de perfil, contacta al
              administrador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
