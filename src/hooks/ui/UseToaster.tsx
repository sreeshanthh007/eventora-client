import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export const useToast = () => {
  const showToast = (message: string, type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'loading':
        toast.loading(message);
        break;
      default:
        toast(message);
    }
  };

  return { showToast };
};
