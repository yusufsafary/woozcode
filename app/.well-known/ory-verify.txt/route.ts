export const dynamic = 'force-static'

export async function GET() {
  return new Response('ory-verify=orynth-52cda611ac3d488cadc2c2bb9ff29150\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
