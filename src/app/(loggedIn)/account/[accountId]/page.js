import { getAccountByAccountId } from "@/lib/actions"
import AccountDetail from "@/app/ui/AccountDetail"

export default async function Page( { params } ){

    const { accountId } = await params;
    const account = await getAccountByAccountId(accountId);

    return (
        <div className="flex flex-col items-center h-screen">
            <AccountDetail account={account}/>
        </div>
    )
}