import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

// 1. Criar uma interface para definir os campos do formulário
interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  // 2. Passamos a interface para o useForm para ele saber o que registrar
  const { register, handleSubmit } = useForm<LoginFormData>();

  // 3. Agora o 'data' não é mais 'any', ele é do tipo 'LoginFormData'
  async function handleLogin(data: LoginFormData) {
    try {
      setLoading(true);
      await signIn(data);
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Consultório</h1>
          <p className="text-gray-500">Acesse sua conta para gerenciar agendamentos</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              {...register('email')}
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="exemplo@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              {...register('password')}
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Sua Senha..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}