'use server';

import { registrationFormSchema } from '@/utils/_validation';
import { decodeForm } from '@/lib/utils';

export type FormState = {
    message?: string | null;
    success: boolean;
};

export async function returnMessage(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    console.log(formData);

    const { email } = await decodeForm(formData, registrationFormSchema);

    console.log(email);
    if (email !== null) {
        return {
            message: email,
            success: true,
        };
    }

    return {
        success: false,
    };
}
