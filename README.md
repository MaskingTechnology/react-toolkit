# React Toolkit

A set of reusables for React mainly used by ourselves.

## Components

### ErrorBoundary

Catches errors and passes it to the provided element.

Usage:

```tsx
import { ErrorBoundary } from '@maskingtech/react-toolkit';

function ErrorHandler({ error }: { error: unknown })
{
    return <>Oops...</>;
}

<ErrorBoundary element={ErrorHandler}>
    {/* Content goes here */}
</ErrorBoundary>;
```

## Hooks

### useDebouncedValue

Catches errors and passes it to the provided element.

Usage:

```tsx
import { useDebouncedValue } from '@maskingtech/react-toolkit';

function MyComponent()
{
    const initialValue: number = 0; // required
    const onChange = (debouncedValue: number) => {  }; // optional
    const delay = 300; // optional, default 500

    const [debouncedValue, setValue] = useDebouncedValue(initialValue, onChange, delay);

    return <p>
        {debouncedValue}
        <button onClick={() => setValue(debouncedValue + 1)}>Increase</button>
    </p>;
}
```

### useFocusOnMount

Gives a form element focus after mount.

Usage:

```tsx
import { useFocusOnMount } from '@maskingtech/react-toolkit';

function MyComponent()
{
    const ref = useFocusOnMount();

    return <input type="text" ref={ref} />;
}
```

### useForm

Provides access to the data of a form after submitting.

Usage:

```tsx
import { useForm } from '@maskingtech/react-toolkit';

function MyComponent()
{
    const submitHandler = (data: FormData) { console.log(data.get('name')); };

    const [ref, state, handleSubmit] = useForm(submitHandler);

    // states: 'pristine' | 'dirty' | 'submitting'

    return <form ref={ref} onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <input type="submit" value="Submit" disabled={state !== 'dirty'} />
    </form>;
}
```

### useFormData

Provides access to the data of a form without submitting.

Usage:

```tsx
import { useFormData } from '@maskingtech/react-toolkit';

function MyComponent()
{
    const dataHandler = (data: FormData) { console.log(data.get('name')); };

    const [ref, state, handleData] = useFormData(dataHandler);

    // states: 'idle' | 'working'

    return <form ref={ref}>
        <input type="text" name="name" />
        <input type="button" value="Go!" disabled={state !== 'working'} />
    </form>;
}
```

### useLoadData

Provides helpers for loading data.

Usage:

```tsx
import { useLoadData } from '@maskingtech/react-toolkit';

async function getData() { /* get data here */ }

function MyComponent()
{
    const [data, isLoading, refresh, setData] = useLoadData(getData);

    if (isLoading) return <>Loading...</>;

    return <p>
        {data}
        <button onClick={() => refresh()}>Refresh</button>
    </p>;
}
```

### usePagination

Provides helpers for loading paginated data.

Usage:

```tsx
import { useLoadData } from '@maskingtech/react-toolkit';

async function getPageData(page: number) { /* get data here */ }

function MyComponent()
{
    const [data, isLoading, isFinished, next, previous, reset, setData] = useLoadData(useLoadData);

    if (isLoading) return <>Loading...</>;

    return <p>
        {data}
        <button onClick={() => previous()}>Previous</button>
        <button onClick={() => next()}>Next</button>
        <button onClick={() => reset()}>Reset</button>
    </p>;
}
```
