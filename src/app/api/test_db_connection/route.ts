import { connectMongo } from '@/utils/connectMongo';

export async function POST(req: Request) {
    const message_json = await req.json();

    let client;
    try {
        client = await connectMongo();

        console.log('DB connected');

        return new Response(JSON.stringify('Connected'), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 200,
        });
    } catch (error) {
        console.log('error : ', error);

        return new Response(JSON.stringify('Failed'), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 503,
        });
    }
}
