import { signOut as googleSignOut } from "../screens/web/auth/googleLogin";

export async function providerSignOut() {
    const res = await googleSignOut();
}