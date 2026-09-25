import { getLook, listGroupLooks } from "./heygen-look";
import { ignoreStatus } from "./ignore-status";

// HeyGen has two id namespaces and only one of them can be rendered: POST
// /v3/videos accepts a *look* id and answers a *group* id with "Avatar not
// found". Older settings may hold a group id, so resolve it to a ready look.
// (v2 look ids are all valid v3 look ids, so stored values keep working.)
export async function resolveAvatarLook(avatarId: string): Promise<string> {
  const look = await getLook(avatarId);
  if (look) {
    if (look.status === "completed") return look.id;
    throw new Error("That avatar is still training. Try again once it is ready.");
  }
  // Neither a private look nor a group with looks — e.g. a stock look. Pass it
  // through untouched and let the render call decide, as before.
  const looks = (await ignoreStatus(listGroupLooks(avatarId), [400, 404])) ?? [];
  if (looks.length === 0) return avatarId;

  // A group: only a trained look can render; an untrained one fails late.
  const ready = looks.find((l) => l.status === "completed");
  if (!ready) {
    throw new Error("That avatar is still training. Try again once it is ready.");
  }
  console.log(`[heygen] avatar group ${avatarId} -> look ${ready.id} (${ready.name})`);
  return ready.id;
}
