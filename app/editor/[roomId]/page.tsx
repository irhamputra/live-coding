import type { Metadata } from 'next'
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout'

// Editor rooms are private — don't index them
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

interface Props {
  params: Promise<{ roomId: string }>
}

export default async function EditorPage({ params }: Props) {
  const { roomId } = await params
  return <WorkspaceLayout roomId={roomId} />
}
