import { Input } from '../../../shared/ui/inputs';
import { IProduct } from '../../../shared/types';
import { DiscountEdit } from '../../discount/ui/DiscountEdit.tsx';
import { Label } from '../../../shared/ui/typography';
import { useEditingProductContext } from '../model';

interface ProductEditProps {
  updateProduct: (product: IProduct) => void;
  setIsEdit: (isEdit: boolean) => void;
}

export function ProductEdit({ updateProduct, setIsEdit }: ProductEditProps) {
  const { editingProduct, handleProductUpdate } = useEditingProductContext();

  const handleEditComplete = () => {
    updateProduct({ ...editingProduct });
    setIsEdit(false);
  };

  return (
    <div>
      <div className="mb-4">
        <Label className={'mb-1'}>상품명: </Label>
        <Input
          type={'text'}
          value={editingProduct.name}
          onChange={(e) => handleProductUpdate('name', e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label className={'mb-1'}>가격: </Label>
        <Input
          type="number"
          value={editingProduct.price}
          onChange={(e) =>
            handleProductUpdate('price', parseInt(e.target.value))
          }
        />
      </div>
      <div className="mb-4">
        <Label className={'mb-1'}>재고: </Label>
        <Input
          type="number"
          value={editingProduct.stock}
          onChange={(e) =>
            handleProductUpdate('stock', parseInt(e.target.value))
          }
        />
      </div>
      <DiscountEdit />
      <button
        onClick={handleEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
}
