import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { z } from 'zod';

export const decodeForm = async <Schema extends z.ZodTypeAny>(
    formDataOrRequest: FormData | Request,
    schema: Schema,
) => {
    const formData =
        formDataOrRequest instanceof FormData
            ? formDataOrRequest
            : await formDataOrRequest.clone().formData();

    return schema.parse(Object.fromEntries(formData)) as z.infer<Schema>;
};
