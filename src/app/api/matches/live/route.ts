import { NextRequest } from 'next/server'
import prisma from '@/lib/db'

// Server-Sent Events endpoint for live match score updates
export async function GET(request: NextRequest) {
  const matchId = request.nextUrl.searchParams.get('matchId')

  if (!matchId) {
    return new Response('matchId parameter required', { status: 400 })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial match data
      try {
        const match = await prisma.match.findUnique({
          where: { id: matchId },
          include: {
            maps: { orderBy: { order: 'asc' } },
            result: true,
          },
        })

        if (match) {
          const data = JSON.stringify({
            type: 'match_update',
            match: {
              id: match.id,
              status: match.status,
              maps: match.maps,
              result: match.result,
            },
          })
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        }
      } catch (error) {
        console.error('SSE initial data error:', error)
      }

      // Poll for updates every 5 seconds
      const interval = setInterval(async () => {
        try {
          const match = await prisma.match.findUnique({
            where: { id: matchId },
            include: {
              maps: { orderBy: { order: 'asc' } },
              result: true,
            },
          })

          if (match) {
            const data = JSON.stringify({
              type: 'match_update',
              match: {
                id: match.id,
                status: match.status,
                maps: match.maps,
                result: match.result,
              },
            })
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))

            // If match is completed, close the stream
            if (match.status === 'COMPLETED' || match.status === 'CANCELLED') {
              clearInterval(interval)
              controller.close()
            }
          }
        } catch (error) {
          console.error('SSE poll error:', error)
          clearInterval(interval)
          controller.close()
        }
      }, 5000)

      // Cleanup on client disconnect
      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
