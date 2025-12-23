
import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

export function useFocusOnMount(ref?: RefObject<HTMLElement>)
{
    const elementRef = ref ?? useRef<HTMLFormElement>(null);

    useEffect(() =>
    {
        if (elementRef === null) return;

        elementRef.current?.focus();

    }, [elementRef]);

    return elementRef;
}
