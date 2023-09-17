/**
 * Function handles the OAuth flow, returns the user from provider.
 */
export default async function OAuth2(code: string) {
  const req = new URL("token", "https://oauth2.googleapis.com/");
  req.searchParams.set("code", code);
  req.searchParams.set("client_id", Bun.env.GOOGLE_CLIENT_ID!);
  req.searchParams.set("client_secret", Bun.env.GOOGLE_CLIENT_SECRET!);
  req.searchParams.set(
    "redirect_uri",
    "http://localhost:3000/auth/callback/google/",
  );
  req.searchParams.set("grant_type", "authorization_code");

  const res = await fetch(req, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (res.status === 200) {
    const token = await res.json();
    const r = await fetch(
      new URL(
        `userinfo?access_token=${token.access_token}`,
        "https://www.googleapis.com/oauth2/v3/",
      ),
    );
    return await r.json();
  }
}
