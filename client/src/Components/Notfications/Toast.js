import { Toaster } from 'react-hot-toast';

export default function ToastContainer() {
  return (
    <Toaster
      position="botton-left"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 2000,
      }}
    />
  );
}
