import { useAction } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Button } from "./button";

export function UpgradeButton(){
    const pay = useAction(api.stripe.pay);
    const router = useRouter();
    
    async function handleUpgradeClick(){
        const url = await pay();
        router.push(url);
    }

    return <Button onClick={handleUpgradeClick} variant={"secondary"}>Upgrade</Button>

}