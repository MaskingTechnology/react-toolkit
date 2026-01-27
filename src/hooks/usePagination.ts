
import type { DependencyList} from 'react';
import { useCallback, useEffect, useState } from 'react';

type GetData<T> = (page: number) => Promise<T[]>;

export function usePagination<T>(getData: GetData<T>, limit: number, deps: DependencyList = [])
{
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const loadData = useCallback(() =>
    {
        let cancelled = false;

        const load = async () =>
        {
            setIsLoading(true);

            const data = await getData(page);

            if (data.length < limit) setIsFinished(true);

            if (cancelled) 
            {
                return;
            }

            setIsLoading(false);

            setData(currentData => [...currentData, ...data]);
        };

        const cancel = () =>
        {
            cancelled = true;
        };

        load();

        return cancel;

    }, [getData, limit, page]);

    const resetData = () =>
    {
        setData([]);
        setIsLoading(false);
        setIsFinished(false);
        setPage(0);

    };

    const next = () =>
    {
        setPage(page => page + 1);
    };

    const previous = () =>
    {
        setPage(page => page - 1);
    };

    const reset = () =>
    {
        const mustLoad = page === 0;
        
        resetData();

        if (mustLoad) loadData();
    };

    useEffect(resetData, [limit, ...deps]);

    useEffect(loadData, [loadData, page]);

    return [data, isLoading, isFinished, next, previous, reset, setData] as const;
}
