// Global type definitions

import { Badge } from "@prisma/client";

// Badge types
export interface UserBadgeWithBadge {
  id: string;
  badge: Badge;
  userId: string;
  earnedAt: Date;
}
