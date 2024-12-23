import AccountEdit from "@/app/ui/AccountEdit";

export default async function Page({ params }){
    const { accountId } = await params;


    return (
        <AccountEdit accountId={accountId}/>
    )
}