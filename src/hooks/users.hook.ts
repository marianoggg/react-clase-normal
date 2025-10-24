import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

//#region Types
interface UseFetchUsersProps {
  url: string;
  pageSize: number;
  search: string;
  setPreviousCursors: Dispatch<SetStateAction<number[]>>;
}

type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  type: string;
  email: string;
};
//#endregion Types

export function useSearch(callback: (value: string) => void) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      callback(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  return { search, setSearch };
}

export function useFetchUsers({
  url,
  pageSize,
  search = "",
  setPreviousCursors,
}: UseFetchUsersProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [cursor, setCursor] = useState<number>(0);

  const fetchUsers = async (
    cursorId: number = 0,
    isGoingBack: boolean = false
  ) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: pageSize,
          last_seen_id: cursorId,
          search: search,
        }),
      });

      const obj = await res.json();

      if (obj.message) {
        console.log(
          "Error obj traido del backend (trayendo usuarios) -->",
          obj.message
        );
        return;
      }

      setData(obj.users);
      setNextCursor(obj.next_cursor ?? null);

      if (!isGoingBack && cursorId !== 0) {
        setPreviousCursors((prev: any) => [...prev, cursor]);
      }

      setCursor(cursorId);
    } catch (error) {
      console.error("Fetch error al traer usuarios -> ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, nextCursor, fetchUsers };
}
