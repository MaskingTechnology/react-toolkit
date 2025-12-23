
import type { DependencyList} from 'react';
import { useCallback, useEffect, useState } from 'react';

type GetData<T> = () => Promise<T>;

export function useLoadData<T>(getData: GetData<T>, deps: DependencyList = [])
{
    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadData = useCallback(() =>
    {
        let cancelled = false;

        const load = async () =>
        {
            setIsLoading(true);

            const data = await getData();

            setIsLoading(false);

            if (cancelled) return;

            setData(data);
        };

        const cancel = () =>
        {
            cancelled = true;
        };

        load();

        return cancel;

    }, [getData]);

    const refresh = useCallback(() =>
    {
        setData(undefined);
        loadData();

    }, [loadData]);

    useEffect(loadData, [getData, ...deps]);

    return [data, isLoading, refresh, setData] as const;
}
