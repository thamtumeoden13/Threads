
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/SearchBar";

async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    // Fetch users
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 20,
        sortBy: 'desc'
    })

    return (
        <>
            <h1 className="head-text mb-10">
                Search
            </h1>

            <div className='mt-5'>
                <Searchbar routeType='search' />
            </div>

            <section className='mt-9 flex flex-wrap gap-4'>
                {result.users.length === 0 ? (
                    <div className="no-result">No User</div>
                ) : (
                    <>
                        {result.users.map((person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType='User'
                            />
                        ))}
                    </>
                )}
            </section>
        </>
    )
}

export default Page