
import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

type States = 'pristine' | 'dirty' | 'submitting';
type SubmitHandler = (data: FormData) => Promise<void>;
type FormRef = RefObject<HTMLFormElement | null>;

export function useForm(submitData: SubmitHandler, ref?: FormRef)
{
    const formRef = ref ?? useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState<FormData>(new FormData());
    const [state, setState] = useState<States>('pristine');

    const updateFormData = useCallback(() =>
    {
        const form = formRef.current;

        if (form === null) return;

        setFormData(new FormData(form));
        setState('pristine');

    }, [formRef]);

    const updateState = useCallback(() =>
    {
        const form = formRef.current;

        if (form === null) return;

        const newFormData = new FormData(form);

        if (formData.values().toArray().length !== newFormData.values().toArray().length)
        {
            setState('dirty');

            return;
        }

        for (const [key, value] of newFormData.entries())
        {
            const originalValue = formData.get(key);

            if (originalValue !== value)
            {
                setState('dirty');

                return;
            }
        }

        setState('pristine');

    }, [formRef, formData]);

    const handleSubmit = useCallback(async () =>
    {
        const form = formRef.current;

        if (form === null) return;

        setState('submitting');

        await submitData(new FormData(form));

        updateFormData();

    }, [formRef, state, submitData, updateFormData]);

    const listenForChanges = () =>
    {
        const form = formRef.current;

        if (form === null) return;

        const changeHandler = () => updateState();

        form.addEventListener('input', changeHandler);

        return () => form.removeEventListener('input', changeHandler);
    };

    useEffect(listenForChanges, [formRef, updateState]);

    useEffect(() => updateFormData(), [updateFormData]);

    return [formRef, state, handleSubmit] as const;
}
