// /reset-password/[token]/page.tsx

import React from "react";
import ResetPassword from "../Reset"; // Assuming this is your client component

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ResetPassword token={token} />
    </div>
  );
}
