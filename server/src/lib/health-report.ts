// Boot time answers the question a version string would: a redeploy restarts the
// process, so a startedAt from last week means the container is still serving old
// code — the first thing to rule out when prod and local disagree. commit is set
// when the image build passes SOURCE_COMMIT through; null just means it didn't.
const STARTED_AT = new Date().toISOString();

export type HealthReport = {
  ok: true;
  startedAt: string;
  uptimeSec: number;
  commit: string | null;
};

export function healthReport(): HealthReport {
  return {
    ok: true,
    startedAt: STARTED_AT,
    uptimeSec: Math.round(process.uptime()),
    commit: process.env.SOURCE_COMMIT ?? null,
  };
}
