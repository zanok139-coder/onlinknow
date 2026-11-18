import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { requestId, senderId } = await req.json();
    if (!requestId || !senderId) return Response.json({ error: 'requestId and senderId required' }, { status: 400 });

    // Update friend request status
    await base44.entities.FriendRequest.update(requestId, { status: 'accepted' });

    // Create receiver → sender follow (current user can create this directly)
    const existingA = await base44.entities.Follow.filter({ follower_id: user.id, following_id: senderId });
    if (existingA.length === 0) {
      await base44.entities.Follow.create({ follower_id: user.id, following_id: senderId });
    }

    // Create sender → receiver follow using service role (bypasses RLS)
    const existingB = await base44.asServiceRole.entities.Follow.filter({ follower_id: senderId, following_id: user.id });
    if (existingB.length === 0) {
      await base44.asServiceRole.entities.Follow.create({ follower_id: senderId, following_id: user.id });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});