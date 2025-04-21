import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/server/actions";
import { revalidatePath } from "next/cache";



interface ImageModalProps {
    image: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({image}) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <img className="rounded-md w-[80px] h-[106.4px]" src={image} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="flex flex-row items-center justify-center">
                    <AlertDialogTitle>Image</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="flex flex-row items-center justify-center">
                    <img className="rounded-md w-[300px] h-[400px]" src={image} />
                </AlertDialogDescription>
                <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}


interface DeleteModalProps {
    firstName: string | undefined;
    lastName: string | undefined;
    userId: string;
}


export const DeleteModal: React.FC<DeleteModalProps> = ({firstName, lastName, userId}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure you want to delete this user: ({firstName} {lastName})
                </AlertDialogTitle>
                <AlertDialogDescription>
                    They will be permanently removed from the database. This action cannot be undone.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <form action={async () => {
                            "use server";
                            await deleteUser(userId);

                        }}>
                    <AlertDialogAction type="submit">
                        Delete
{/*     
                        <button type="submit">Delete</button> */}

                    </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


