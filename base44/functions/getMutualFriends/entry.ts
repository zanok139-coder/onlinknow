import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { targetUserId } = await req.json();
  if (!targetUserId) return Response.json({ error: 'targetUserId required' }, { status: 400 });

  // Use service role to fetch both users' accepted friend requests
  const [myRequests, theirRequests] = await Promise.all([
    base44.asServiceRole.entities.FriendRequest.filter({ status: 'accepted' }),
    base44.asServiceRole.entities.FriendRequest.filter({ status: 'accepted' }),
  ]);

  // Build current user's friend ID set
  const myFriendIds = new Set();
  for (const r of myRequests) {
    if (r.sender_id === user.id) myFriendIds.add(r.receiver_id);
    else if (r.receiver_id === user.id) myFriendIds.add(r.sender_id);
  }

  // Build target user's friend ID set
  const theirFriendIds = new Set();
  for (const r of theirRequests) {
    if (r.sender_id === targetUserId) theirFriendIds.add(r.receiver_id);
    else if (r.receiver_id === targetUserId) theirFriendIds.add(r.sender_id);
  }

  // Remove the two users themselves from each other's sets
  myFriendIds.delete(targetUserId);
  theirFriendIds.delete(user.id);

  // Intersection = mutual friends
  const mutualIds = [...myFriendIds].filter(id => theirFriendIds.has(id));

  return Response.json({ count: mutualIds.length, mutualIds });
});