import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();
    const userInfo = await fetchUser(user?.id);
    if(userInfo?.onboarded) redirect('/')
    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || "",
        image: userInfo?.image || user?.imageUrl,
        bio: userInfo?.bio || user?.bio || ""
    }

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h3 className="head-text">Onboarding</h3>
            <p className="mt-3 text-base-regular text-light-2">Complete your profile now to use Threads.</p>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile 
                    user={userData}
                    btnTitle="Continue"
                />
            </section>
        </main>
    )
}

export default Page;