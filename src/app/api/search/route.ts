import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const [users, teams, schools, tournaments, news, events] = await Promise.all([
      // Users
      prisma.user.findMany({
        where: {
          username: { contains: query, mode: 'insensitive' },
          status: 'ACTIVE',
        },
        take: 5,
        select: {
          id: true,
          username: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
      // Teams
      prisma.team.findMany({
        where: { name: { contains: query, mode: 'insensitive' } },
        take: 5,
        select: { id: true, name: true, slug: true },
      }),
      // Schools
      prisma.school.findMany({
        where: { name: { contains: query, mode: 'insensitive' } },
        take: 5,
        select: { id: true, name: true, slug: true },
      }),
      // Tournaments
      prisma.tournament.findMany({
        where: { name: { contains: query, mode: 'insensitive' } },
        take: 5,
        select: { id: true, name: true, slug: true },
      }),
      // News
      prisma.newsPost.findMany({
        where: { 
          title: { contains: query, mode: 'insensitive' },
          isDraft: false,
        },
        take: 5,
        select: { id: true, title: true, slug: true },
      }),
      // Events
      prisma.event.findMany({
        where: { title: { contains: query, mode: 'insensitive' } },
        take: 5,
        select: { id: true, title: true, slug: true },
      }),
    ]);

    const results = [
      ...users.map((u: any) => ({
        id: `u-${u.id}`,
        title: u.username,
        subtitle: u.profile ? `${u.profile.firstName} ${u.profile.lastName}` : undefined,
        type: 'user',
        url: `/u/${u.username}`
      })),
      ...teams.map((t: any) => ({
        id: `t-${t.id}`,
        title: t.name,
        type: 'team',
        url: `/teams/${t.slug || t.id}`
      })),
      ...schools.map((s: any) => ({
        id: `s-${s.id}`,
        title: s.name,
        type: 'school',
        url: `/schools/${s.slug || s.id}`
      })),
      ...tournaments.map((t: any) => ({
        id: `tr-${t.id}`,
        title: t.name,
        type: 'tournament',
        url: `/tournaments/${t.slug || t.id}`
      })),
      ...news.map((n: any) => ({
        id: `n-${n.id}`,
        title: n.title,
        type: 'news',
        url: `/news/${n.slug || n.id}`
      })),
      ...events.map((e: any) => ({
        id: `e-${e.id}`,
        title: e.title,
        type: 'event',
        url: `/events/${e.slug || e.id}`
      })),
    ];

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
