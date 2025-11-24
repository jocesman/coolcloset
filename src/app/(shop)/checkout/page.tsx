import { Title } from '@/components';
import { PlaceOrder } from './place-order';

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar Orden" />
        
        <PlaceOrder />
      </div>
    </div>
  );
}
