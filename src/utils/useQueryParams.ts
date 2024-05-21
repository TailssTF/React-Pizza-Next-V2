import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function useQueryParams<T = {}>() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const urlSearchParams = new URLSearchParams(searchParams);

  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, value.toString());
      }
    });

    replace(`${pathname}?${urlSearchParams.toString()}`);
  }

  return { urlSearchParams, setQueryParams };
}
