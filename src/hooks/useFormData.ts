
import type { RefObject } from 'react';
import { useCallback, useState, useRef } from 'react';

type States = 'idle' | 'working';
type DataHandler = (data: FormData) => Promise<void>;
type FormRef = RefObject<HTMLFormElement | null>;

export function useFormData(handler: DataHandler, ref?: FormRef)
{
    const formRef = ref ?? useRef<HTMLFormElement>(null);

    const [state, setState] = useState<States>('idle');

    const handleData = useCallback(async () =>
    {
        const form = formRef.current;

        if (form === null) return;

        setState('working');

        await handler(new FormData(form));

        setState('idle');

    }, [formRef, handler]);

    return [formRef, state, handleData] as const;
}
