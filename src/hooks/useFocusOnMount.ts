
import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

type FormContentElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function useFocusOnMount(ref?: RefObject<FormContentElement | null>)
{
    const elementRef = ref ?? useRef<FormContentElement>(null);

    useEffect(() =>
    {
        if (elementRef === null) return;

        elementRef.current?.focus();

    }, [elementRef]);

    return elementRef;
}
