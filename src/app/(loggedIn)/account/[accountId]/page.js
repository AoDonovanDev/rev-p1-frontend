import { getAccountByAccountId } from "@/lib/actions"
import AccountDetail from "@/app/ui/AccountDetail"

/* export const revalidate = +(process.env.NEXT_REVALIDATION_TIME || 0) || 3600
export const dynamic = 'force-static' */

export default async function Page( { params } ){

    const { accountId } = await params;
    const account = await getAccountByAccountId(accountId);

    return (
        <div className="flex flex-col items-center">
            <AccountDetail account={account}/>
        </div>
    )
}