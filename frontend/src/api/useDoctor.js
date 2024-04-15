import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";

export async function getDoctor() {
    const response = await authApi
        .get(`/doctors/profile`)
        .then((res) => res.data);
    return response;
}

export function useDoctor() {
    const { data: user, isPending } = useQuery({
        queryKey: ["doctor"],
        queryFn: async () => getDoctor(user),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return [user ?? null, isPending];
}
