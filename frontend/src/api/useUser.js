import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";

export async function getUser() {
    const response = await authApi.get(`/profile`).then((res) => res.data);
    return response;
}

export function useUser() {
    const { data: user, isPending } = useQuery({
        queryKey: ["user"],
        queryFn: async () => getUser(user),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return [user ?? null, isPending];
}
