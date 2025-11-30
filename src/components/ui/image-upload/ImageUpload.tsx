'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { IoCloudUploadOutline, IoTrashOutline } from 'react-icons/io5';

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export const ImageUpload = ({ images, onChange, maxImages = 5 }: Props) => {
  const onUpload = (result: any) => {
    if (result.event === 'success') {
      const newImageUrl = result.info.secure_url;
      onChange([...images, newImageUrl]);
    }
  };

  const onRemove = (url: string) => {
    onChange(images.filter((img) => img !== url));
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((url) => (
          <div key={url} className="relative aspect-square">
            <Image
              src={url}
              alt="Product image"
              fill
              className="object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onRemove(url)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <IoTrashOutline size={16} />
            </button>
          </div>
        ))}
      </div>

      {images.length < maxImages && (
        <CldUploadWidget
          uploadPreset="coolcloset-products"
          onSuccess={onUpload}
          options={{
            maxFiles: 1,
            resourceType: 'image',
            folder: 'coolcloset/products',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
            maxFileSize: 3145728, // 3 MB en bytes
            minImageWidth: 400,
            minImageHeight: 400,
            maxImageWidth: 4000,
            maxImageHeight: 4000,
            cropping: false,
            multiple: false,
            showAdvancedOptions: false,
            sources: ['local', 'url'],
            styles: {
              palette: {
                window: '#FFFFFF',
                windowBorder: '#90A0B3',
                tabIcon: '#3B82F6',
                menuIcons: '#5A616A',
                textDark: '#000000',
                textLight: '#FFFFFF',
                link: '#3B82F6',
                action: '#3B82F6',
                inactiveTabIcon: '#0E2F5A',
                error: '#F44235',
                inProgress: '#0078FF',
                complete: '#20B832',
                sourceBg: '#E4EBF1',
              },
            },
          }}
        >
          {({ open }) => {
            return (
              <button
                type="button"
                onClick={() => {
                  console.log('Abriendo widget de Cloudinary...');
                  open();
                }}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors"
              >
                <div className="flex flex-col items-center gap-2">
                  <IoCloudUploadOutline size={40} className="text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click para subir imagen
                  </p>
                  <p className="text-xs text-gray-400">
                    {images.length}/{maxImages} imágenes
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Formatos: JPG, PNG, WebP • Mín: 400x400px • Máx: 3MB
                  </p>
                </div>
              </button>
            );
          }}
        </CldUploadWidget>
      )}

      {images.length === 0 && (
        <p className="text-sm text-red-500 mt-2">
          Debes subir al menos una imagen
        </p>
      )}
    </div>
  );
};
