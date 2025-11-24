import { initialData } from './seed-data';
import prisma from '../lib/prisma';
import bcryptjs from 'bcryptjs';

async function main() {
  // 1. Borrar registros previos
  // await Promise.all([
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);

  const { categories, products, users, countries } = initialData;

  // 2. Categorias
  const categoriesData = categories.map((name) => ({ name }));
  
  await prisma.category.createMany({
    data: categoriesData
  });

  const categoriesDB = await prisma.category.findMany();
  
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<string=shirt, string=categoryID>

  // 3. Productos
  // products.forEach(async (product) => {
  for (const product of products) {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })

    // Images
    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });

  }

  // 4. Paises
  await prisma.country.createMany({
    data: countries
  });

  // 5. Usuarios
  for (const user of users) {
    const { password, ...rest } = user;
    const passwordHash = bcryptjs.hashSync(password, 10);
    
    await prisma.user.create({
      data: {
        ...rest,
        password: passwordHash
      }
    })
  }

  console.log('Seed ejecutado correctamente');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();
