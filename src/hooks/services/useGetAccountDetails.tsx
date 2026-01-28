import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { AccountDetails } from "@/utils/types/tmdbTypes";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
  const { data } = await tmdbSingleton.get<AccountDetails>(`/account`);
  return data;
};

const useGetAccountDetails = (accountId?: string) => {
  return useQuery({
    queryKey: ["get-account-details", accountId],
    queryFn: queryFn,
    enabled: accountId === "",
  });
};

export default useGetAccountDetails;
