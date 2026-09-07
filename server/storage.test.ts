import assert from "node:assert/strict";
import { test } from "node:test";
import { buildAppointmentCancellationUpdate } from "./storage";

test("preserves client cancellation billing and audit details", () => {
  const cancelledAt = new Date("2026-09-05T19:00:00Z");

  assert.deepEqual(
    buildAppointmentCancellationUpdate(
      {
        cancelReason: "Schedule changed",
        cancelledBy: "client",
        cancellationFee: 25.5,
        refundAmount: 74.5,
      },
      cancelledAt,
    ),
    {
      status: "cancelled",
      cancelReason: "Schedule changed",
      cancelledBy: "client",
      cancellationFee: "25.5",
      refundAmount: "74.5",
      cancelledAt,
      updatedAt: cancelledAt,
    },
  );
});

test("keeps the admin cancellation call shape compatible", () => {
  const cancelledAt = new Date("2026-09-05T19:00:00Z");

  assert.deepEqual(
    buildAppointmentCancellationUpdate("Caregiver unavailable", cancelledAt),
    {
      status: "cancelled",
      cancelReason: "Caregiver unavailable",
      cancelledAt,
      updatedAt: cancelledAt,
    },
  );
});