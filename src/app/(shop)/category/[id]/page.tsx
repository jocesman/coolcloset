import { notFound } from "next/navigation";

export default async function CategoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;


  // Aquí podrías obtener datos reales
  const validCategories = ["men", "women", "kids"];

  if (!validCategories.includes(id)) {
    notFound(); // usa (shop)/not-found.tsx automáticamente
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">
        Category Page =-= {id}
      </h1>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = ["men", "women", "kids"];
  return categories.map((id) => ({ id }));
}


// interface Props {
//     params: {
//         id: string;
//     }
// }


// export default function({ params }: Props) {

//     const { id } = params;

//     return ( 
//         <div>
//             <h1>Category Page =-= {id} </h1>            
//         </div>
//     );
// }