'use server';

type FormState =
    | {
          error?: string;
      }
    | undefined;

export async function returnMessage(prevState: FormState, formData: FormData) {
    console.log('heo');
    return 'hello';
}
