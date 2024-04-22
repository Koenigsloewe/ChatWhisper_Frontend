

import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"; 
import { useLogoutMutation } from "@/redux/features/authApiSlice";

export function useLogout() {
    const router = useRouter();
    const [logout] = useLogoutMutation();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            toast({
                title: "Logged Out",
                description: "You have logged out successfully.",
            });
            router.push("/login");
        } catch (error: any) {
            if ('data' in error && error.data && typeof error.data === 'object') {
                const errors = error.data;
                Object.keys(errors).forEach((key) => {
                    const messages = errors[key];
                    toast({
                        title: "Error with " + key,
                        description: messages, 
                    });
                });
            } else {
                toast({
                    title: "Error",
                    description: "There was a problem processing your logout. Please try again.",
                });
            }
        }
    };

    return handleLogout;
}
