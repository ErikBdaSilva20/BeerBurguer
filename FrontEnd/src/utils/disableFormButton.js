import { toast } from 'react-toastify';

/**
 * Função utilitária para gerenciar submissão de formulários
 * - Mostra toast de pending
 * - Mostra toast de sucesso ou erro
 * - Retorna uma função que você pode usar dentro do onSubmit
 *
 * @param {Function} apiCall - função async que faz a requisição
 * @param {Object} options - configurações dos toasts
 * @param {string} options.pending - mensagem de carregamento
 * @param {string} options.success - mensagem de sucesso
 * @param {string} options.error - mensagem de erro genérico
 */
export function handleFormSubmit(apiCall, options = {}) {
  const { pending = 'Carregando...', success = 'Sucesso!', error = 'Erro no sistema' } = options;

  return async function (data, setSubmitting) {
    try {
      setSubmitting(true); // desativa o botão

      // Mostra toast de pending
      const toastId = toast.loading(pending);

      const response = await apiCall(data);

      // Verifica status para custom success/error
      if (response.status >= 200 && response.status < 300) {
        toast.update(toastId, {
          render: success,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
      } else if (response.status === 409) {
        toast.update(toastId, {
          render: 'Email já cadastrado',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, { render: error, type: 'error', isLoading: false, autoClose: 3000 });
      }

      setSubmitting(false); // reativa botão
      return response;
    } catch (err) {
      toast.error(error);
      setSubmitting(false);
      console.error(err);
      return null;
    }
  };
}
