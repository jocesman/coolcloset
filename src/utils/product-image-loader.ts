export const getProductImage = (imageName: string) => {
  return imageName.startsWith('http') ? imageName : `/products/${imageName}`;
};
