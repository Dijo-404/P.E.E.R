import { Circle } from "lucide-react";

type SyncStatus = "synced" | "syncing" | "offline";

interface SyncStatusRingProps {
  status: SyncStatus;
  size?: number;
}

export const SyncStatusRing = ({ status, size = 80 }: SyncStatusRingProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "synced":
        return {
          ring: "stroke-primary",
          circle: "fill-primary",
          animation: "",
        };
      case "syncing":
        return {
          ring: "stroke-accent",
          circle: "fill-accent",
          animation: "animate-pulse",
        };
      case "offline":
        return {
          ring: "stroke-muted",
          circle: "fill-muted",
          animation: "",
        };
      default:
        return {
          ring: "stroke-muted",
          circle: "fill-muted",
          animation: "",
        };
    }
  };

  const styles = getStatusStyles();

  const circumference = 2 * Math.PI * 45;
  const circumferenceProgress = 283;

  return (
    <div className="relative inline-block" role="status" aria-label={`Sync status: ${status}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={styles.animation}
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className={`${styles.ring} opacity-30`}
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={status === "offline" ? "10 10" : `${circumferenceProgress}`}
          strokeDashoffset={status === "syncing" ? 70 : 0}
          className={`${styles.ring} transition-all duration-500`}
          style={{
            strokeDashoffset: status === "syncing" ? 70 : 0,
            animation: status === "syncing" ? "spin 2s linear infinite" : undefined,
          }}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          className={`${styles.circle} opacity-20`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-card border-2 border-border flex items-center justify-center text-2xl">
          👤
        </div>
      </div>
      <style>{`
        @keyframes spin {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: ${circumference};
          }
        }
      `}</style>
    </div>
  );
};
