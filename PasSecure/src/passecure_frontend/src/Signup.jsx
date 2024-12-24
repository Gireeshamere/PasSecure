import { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import "./index.scss"
import { Principal } from "@dfinity/principal";

export default function Signup() {
   const [principal, setPrincipal] = useState(null); // Store principal

   async function handleConnect() {
      const authClient = await AuthClient.create();
      authClient.login({
         maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
         identityProvider: "https://identity.ic0.app/#authorize",
         onSuccess: async () => {
            const identity = await authClient.getIdentity();
            const principal = identity.getPrincipal().toText(); // Extract principal as text
            setPrincipal(principal);
            console.log("Extracted Principal:", principal);
            localStorage.setItem("prin",principal);
            console.log("Principal saved in localStorage:", localStorage.getItem("prin")); // Confirm saved value

         },
      });
   }

   useEffect(() => {
      async function init() {
         const authClient = await AuthClient.create();
         if (await authClient.isAuthenticated()) {
            const identity = await authClient.getIdentity();
            const principal = identity.getPrincipal().toText(); // Extract principal as text
            setPrincipal(principal);
            console.log("Extracted Principal:", principal);
            localStorage.setItem("prin",principal);

         }
      }
      init();
   }, []);

   return (
      <>
         <div>
            <button
               className="nav-button"
               onClick={handleConnect}
               style={{
                  cursor: "pointer",
                  marginTop: "32px",
               }}
            >
               Connect
            </button>
         </div>

         {/* <div>
            {principal ? (
               <p>Your Principal Identity: {principal}</p>
            ) : (
               <p>Please login to see your identity.</p>
            )}
         </div> */}
      </>
   );
}