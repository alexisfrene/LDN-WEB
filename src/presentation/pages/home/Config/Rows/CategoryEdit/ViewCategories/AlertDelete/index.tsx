import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Icons,
  type IconsType
} from "@components";

interface AlertDeleteProps {
  title: string;
  id: string;
  deleteFn: (value:any) => Promise<any>;
  triggerIconType: IconsType;
  triggerIconHeight: number;
  triggerIconClass: string;
  queryKey: string;
  isValue?: boolean;
  categoryId?: string;
}

export const AlertDelete: React.FC<AlertDeleteProps> = ({
  title,
  id,
  deleteFn,
  triggerIconType,
  triggerIconHeight,
  triggerIconClass,
  queryKey,
  isValue = false,
  categoryId
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const handleDelete = () => {
    if (isValue && categoryId) {
      mutation.mutate({ category_value: id, category_id: categoryId });
    } else {
      mutation.mutate(id);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icons type={triggerIconType} height={triggerIconHeight} className={triggerIconClass} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Estas seguro de eliminar ${title.toUpperCase()}?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es permanente, se perderán los datos y las imágenes asociadas a la misma!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Icons } from "@components";
// import { deleteCollectionCategory, deleteValueCategory } from "@services";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import React from "react";

// interface Props {
//     title:string;
// category_id:string;
// }

// export const AlertDeleteCategory:React.FC<Props> = ({title , category_id}) => {
//     const queryClient = useQueryClient();
//     const mutation = useMutation({
//         mutationFn: deleteCollectionCategory,
//         onSuccess: () => {
//           queryClient.invalidateQueries({ queryKey: ['categories'] });
//         },
//       });
//     return   <AlertDialog>
//     <AlertDialogTrigger>
//       <Icons
//         type="trash"
//         height={25}
//         className=" cursor-pointer rounded-tr-sm text-slate-300 hover:text-red-600"
//       />
//     </AlertDialogTrigger>
//     <AlertDialogContent>
//       <AlertDialogHeader>
//         <AlertDialogTitle>
//           {`Estas seguro de  eliminar esto, (${title.toUpperCase()})?`}
//         </AlertDialogTitle>
//         <AlertDialogDescription>
//           Esta acción es permanente se perderán los datos y
//           las imágenes asociadas a la misma!
//         </AlertDialogDescription>
//       </AlertDialogHeader>
//       <AlertDialogFooter>
//         <AlertDialogCancel>Cancel</AlertDialogCancel>
//         <AlertDialogAction
//           onClick={() => {
//             mutation.mutate(category_id);
//           }}
//         >
//           Continue
//         </AlertDialogAction>
//       </AlertDialogFooter>
//     </AlertDialogContent>
//   </AlertDialog>
// }

// interface AlertProps{
//     value:string ;value_id:string;  category_id:string; 
// }

// export const AlertDeleteValue:React.FC<AlertProps> =  ({value ,value_id , category_id }) => {
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//       mutationFn: deleteValueCategory,
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ['categories'] });
//       },
//     });
//     return  <AlertDialog>
//     <AlertDialogTrigger>
//       <Icons
//         type="close"
//         height={15}
//         className="absolute right-0 top-0 cursor-pointer rounded-tr-sm bg-red-500 hover:bg-red-400"
//       />
//     </AlertDialogTrigger>
//     <AlertDialogContent>
//       <AlertDialogHeader>
//         <AlertDialogTitle>
//           {`Estas seguro de  eliminar ${value.toUpperCase()} ?`}
//         </AlertDialogTitle>
//         <AlertDialogDescription>
//           Esta acción es permanente se perderán los datos
//           y las imágenes asociadas a la misma!
//         </AlertDialogDescription>
//       </AlertDialogHeader>
//       <AlertDialogFooter>
//         <AlertDialogCancel>Cancel</AlertDialogCancel>
//         <AlertDialogAction
//           onClick={async () => {
//             mutation.mutate({category_value:value_id, category_id});
//           }}
//         >
//           Continue
//         </AlertDialogAction>
//       </AlertDialogFooter>
//     </AlertDialogContent>
//   </AlertDialog>
// }