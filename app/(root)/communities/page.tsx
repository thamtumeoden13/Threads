
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";
import Searchbar from "@/components/shared/SearchBar";

async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    // Fetch communities
    const result = await fetchCommunities({
        searchString: '',
        pageNumber: 1,
        pageSize: 20,
        sortBy: 'desc'
    })

    console.log('result', JSON.stringify(result))

    return (
        <>
            <h1 className="head-text">
                Communites
            </h1>

            <div className='mt-5'>
                <Searchbar routeType='communities' />
            </div>

            <section className='mt-9 flex flex-wrap gap-4'>
                {result.communities.length === 0 ? (
                    <div className="no-result">No User</div>
                ) : (
                    <>
                        {result.communities.map((community) => (
                            <CommunityCard
                                key={community.id}
                                id={community.id}
                                name={community.name}
                                username={community.username}
                                imgUrl={community.image}
                                bio={community.bio}
                                members={community.members}
                            />
                        ))}
                    </>
                )}
            </section>
        </>
    )
}

export default Page