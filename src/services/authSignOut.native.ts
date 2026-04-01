import { signOut as googleSignOut } from "../screens/mobile/auth/googleLogin.native";

export async function providerSignOut() {
  await googleSignOut();
}
